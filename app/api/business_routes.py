from flask import Blueprint, jsonify, request, redirect, url_for, abort
from flask_login import login_required, current_user
from app.models import db, Business, business_amenities, business_categories, business_hours, Amenity, Category, BusinessImages, Day, Question, Answer, Review, User, Vote
from app.seeds import restaurant_food_categories
from ..forms import BusinessForm, ReviewForm, BusinessImageForm, DayForm, NewBusinessImageForm
from datetime import time
from .AWS_helpers import remove_file_from_s3, get_unique_filename, upload_file_to_s3

business_routes = Blueprint('businesses', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@business_routes.route("/")
def all_businesses():
    """
    Query for all businesses and returns them in a list of business dictionaries
    """
    allBusinesses = []
    businesses = Business.query.all()
    for business in businesses:
        newBusiness = business.to_dict()

        owner = User.query.get(newBusiness['ownerId'])

        images = BusinessImages.query.filter(BusinessImages.businessId == newBusiness['id']).all()

        preview_image = BusinessImages.query.filter(BusinessImages.businessId == newBusiness['id']).filter(BusinessImages.preview == True).all()

        reviews = Review.query.filter(Review.businessId == newBusiness['id']).all()

        business_amenities_join = db.session.query(Amenity).join(
            business_amenities,
            business_amenities.c.amenityId == Amenity.id
        ).filter(business_amenities.c.businessId == newBusiness['id']).all()

        business_categories_join = db.session.query(Category).join(
            business_categories,
            business_categories.c.categoryId == Category.id
        ).filter(business_categories.c.businessId == newBusiness['id']).all()

        business_days_join = db.session.query(Day).join(
            business_hours,
            business_hours.c.dayId == Day.id
        ).filter(business_hours.c.businessId == business.id).all()
        hours_dict = [{
                "id": day.id,
                "day": day.day,
                "open_time": day.open_time.strftime("%H:%M:%S") if day.open_time else None,
                "close_time": day.close_time.strftime("%H:%M:%S") if day.close_time else None
            } for day in business_days_join]

        newBusiness["hours"] = hours_dict
        newBusiness["owner"] = owner.to_dict()
        newBusiness["images"] = [image.to_dict() for image in images]
        newBusiness["reviews"] = [review.to_dict() for review in reviews]
        newBusiness["amenities"] = [amenity.to_dict() for amenity in business_amenities_join]
        if preview_image:
            newBusiness['preview_image'] = preview_image[0].to_dict()
        newBusiness['categories'] = [category.to_dict() for category in business_categories_join]
        allBusinesses.append(newBusiness)
    return {"businesses": allBusinesses}


@business_routes.route("/new", methods=["POST"])
def createNewBusiness():
    """
    Creates new business based on ht
    """
    request_data = request.get_json()
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    print("DATAA", data)
    if form.validate_on_submit():
        newBusiness = Business(
            name = data["name"],
            url = data["url"],
            phone = data["phone"],
            address = data["address"],
            city = data["city"],
            state = data["state"],
            zip_code = data["zip_code"],
            about = data["about"],
            price = data["price"],
            ownerId = data["ownerId"]
        )
        db.session.add(newBusiness)
        db.session.commit()
        return newBusiness.to_dict()
    print("ERRORS.PY", {"errors": form.errors})
    return {"errors": form.errors}, 401

@business_routes.route("/<int:id>/images", methods=["GET", "POST"])
def addImage(id):
    request_data = request.get_json()

    business = Business.query.get(id)
    form = BusinessImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("IMAGE -------------------------", form.data)
    if form.validate_on_submit():
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return {"errors": upload}
        businessImage = BusinessImages(
            url = upload["url"],
            preview = True,
            businessId = id,
            ownerId = business.ownerId
        )
        db.session.add(businessImage)
        db.session.commit()
        return businessImage.to_dict()
    return {"errors": form.errors}, 401

@business_routes.route("/<int:id>/hours", methods=["GET", "POST"])
def addHours(id):
    request_data = request.get_json()
    business = Business.query.get(id)
    if not business:
        return {"errors": "Business not found"}, 404
    form = DayForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        hours = Day(
            day = form.data["day"],
            closed = form.data["closed"],
            open_time=time(0, 0) if form.data["open_time"] is None else form.data["open_time"],
            close_time=time(0, 0) if form.data["close_time"] is None else form.data["close_time"]
        )
        db.session.add(hours)
        db.session.commit()

        business_hour = business_hours.insert().values(
            businessId = id,
            dayId = hours.id
        )

        db.session.execute(business_hour)
        db.session.commit()
        return hours.to_dict()
    return {"errors": form.errors}, 401

@business_routes.route("/<int:id>/categories", methods=["POST"])
def addCategories(id):
    request_data = request.get_json()
    business = Business.query.get(id)
    if not business:
        return {"errors": "Business not found"}, 404
    form = CategoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        category = Category.query.filter_by(category=form.data["category"]).first()
        business_category = business_categories.insert().values(
            businessId = id,
            categoryId = category.id
        )
        db.session.execute(business_category)
        db.session.commit()
        return business_category.to_dict()
    return {"errors": form.errors}, 401

@business_routes.route("/<int:id>/edit", methods=["PUT"])
def updateBusiness(id):
    request_data = request.get_json()
    form = BusinessForm(
        id = id,
        name = request_data["name"],
        url = request_data["url"],
        phone = request_data["phone"],
        address = request_data["address"],
        city = request_data["city"],
        state = request_data["state"],
        zip_code = request_data["zip_code"],
        about = request_data["about"],
        price = request_data["price"],
        ownerId = request_data["ownerId"]
    )
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    if form.validate_on_submit():
        updatedBusiness = Business.query.get(id)
        updatedBusiness.name = data["name"]
        updatedBusiness.url = data["url"]
        updatedBusiness.phone = data["phone"]
        updatedBusiness.address = data["address"]
        updatedBusiness.city = data["city"]
        updatedBusiness.state = data["state"]
        updatedBusiness.zip_code = data["zip_code"]
        updatedBusiness.about = data["about"]
        updatedBusiness.price = data["price"]
        updatedBusiness.ownerId = data["ownerId"]
        db.session.commit()
        return updatedBusiness.to_dict()
    return {"errors": form.errors}, 401

@business_routes.route("/<int:id>/review", methods=["POST"])
@login_required
def createBusinessReview(id):
    """
    Post a new review for a business based on business id
    """
    request_data = request.get_json()
    form = ReviewForm(
        stars=request_data["stars"],
        review=request_data["review"],
        userId=request_data["userId"],
        businessId=id
    )
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_review = Review(
            stars=data['stars'],
            review=data['review'],
            userId=data['userId'],
            businessId=id
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return {'errors': 'Form is not valid.'}, 401

@business_routes.route("/<int:id>/review/all")
def getBusinessReviews(id):
    """
    Get all reviews for a business based on business id including their votes.
    """
    reviews = Review.query.filter_by(businessId=id)
    if (reviews):
        allBusinessReview = []

        for review in reviews:
            newReview = review.to_dict()
            votes = Vote.query.filter(Vote.reviewId == newReview["id"]).all()
            newReview['votes'] = [vote.to_dict() for vote in votes]
            allBusinessReview.append(newReview)

        return {'reviews': allBusinessReview}
    else:
        return {'errors': 'No reviews found for this business'}, 401

# @business_routes.route("/")
# def getAllBusinesses():
#   businesses = Business.query.all();
#   print(businesses)
#   [business.to_dict() for business in businesses]
#   return businesses

@business_routes.route("/categories/all", methods=["GET"])
def getAllCategories():
    categories = Category.query.order_by(Category.category).all()
    allCategories = [category.category for category in categories]
    return {'categories': allCategories}


@business_routes.route("/<int:id>")
def getSingleBusiness(id):
    curr_business = Business.query.get(id)
    if (curr_business):

        business_reviews = Review.query.filter(Review.businessId == id).all()
        business_images = BusinessImages.query.filter(BusinessImages.businessId == id).all()

        business_amenities_join = db.session.query(Amenity).join(
            business_amenities,
            business_amenities.c.amenityId == Amenity.id
        ).filter(business_amenities.c.businessId == id).all()

        business_days_join = db.session.query(Day).join(
            business_hours,
            business_hours.c.dayId == Day.id
        ).filter(business_hours.c.businessId == id).all()

        business_categories_join = db.session.query(Category).join(
            business_categories,
            business_categories.c.categoryId == Category.id
        ).filter(business_categories.c.businessId == id).all()

        business_questions = Question.query.filter(Question.businessId == id).all()
        business_answers = db.session.query(Answer).join(
            Question,
            Question.id == Answer.questionId
        ).filter(Question.businessId == id).all()

        biz_dict = curr_business.to_dict()
        reviews_dict = [review.to_dict() for review in business_reviews]
        amenities_dict = [amenity.to_dict() for amenity in business_amenities_join]
        hours_dict = [{
                "id": day.id,
                "day": day.day,
                "open_time": day.open_time.strftime("%H:%M:%S") if day.open_time else None,
                "close_time": day.close_time.strftime("%H:%M:%S") if day.close_time else None,
                "closed": day.closed
            } for day in business_days_join]
        categories_dict = [category.to_dict() for category in business_categories_join]
        questions_dict = [question.to_dict() for question in business_questions]
        for question in questions_dict:
            question_id = question["id"]
            question_answers = [answer.to_dict() for answer in business_answers if answer.questionId == question_id]
            question["answers"] = question_answers
        images_dict = [image.to_dict() for image in business_images]

        return {**biz_dict, "reviews": reviews_dict, "images": images_dict, "amenities": amenities_dict, "hours": hours_dict, "categories": categories_dict, "questions": questions_dict}
    else:
        abort(404, "Business not found")

@business_routes.route("/categories")
def get_business_categories():
    categories = Category.query.order_by('id').limit(8)
    random_categories = []
    for category in categories:
        random_categories.append({
            "id": category.id,
            "category": category.category,
        })
    return {'categories': random_categories}

@business_routes.route("/<int:id>/edit", methods=["DELETE"])
def deleteBusiness(id):
    business = Business.query.get(id)

    if business:
        db.session.delete(business)
        db.session.commit()
        return business.to_dict()
    else:
        abort(404, "Business not found")

@business_routes.route("/image/<int:id>", methods=["DELETE"])
def deleteBusinessImage(id):
    image_to_delete = BusinessImages.query.get(id)
    url = image_to_delete.url

    if url:
        checkImage = url.split("://")[1][0:4]
        if checkImage == "welp":
            deleted_file = remove_file_from_s3(url)

    if image_to_delete:
        if image_to_delete.preview:
            new_preview = BusinessImages.query.filter(BusinessImages.businessId == image_to_delete.to_dict()["businessId"], BusinessImages.id != image_to_delete.to_dict()["id"]).first()
            new_preview.preview = True
        db.session.delete(image_to_delete)
        db.session.commit()
        return image_to_delete.to_dict()
    else:
        abort(404, "business not found")

@business_routes.route("/image/new", methods=["POST"])
def addNewImage():
    form = NewBusinessImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        businessId = form.data["businessId"]
        if form.data["preview"] == True:
            oldPreview = BusinessImages.query.filter(BusinessImages.businessId == businessId, BusinessImages.preview == True).first()
            oldPreview.preview = False
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return {"errors": upload}
        newImage = BusinessImages(
            url = upload["url"],
            preview = form.data["preview"],
            businessId = form.data["businessId"],
            ownerId = form.data["userId"]
        )
        db.session.add(newImage)
        db.session.commit()
        return newImage.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
