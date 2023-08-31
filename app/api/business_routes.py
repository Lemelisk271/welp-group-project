from flask import Blueprint, jsonify, request, redirect, url_for, abort
from flask_login import login_required, current_user
from app.models import db, Business, business_amenities, business_categories, business_hours, Amenity, Category, BusinessImages, Day, Question, Answer, Review, User
from ..forms import BusinessForm, ReviewForm

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

        newBusiness["owner"] = owner.to_dict()
        newBusiness["images"] = [image.to_dict() for image in images]
        newBusiness["reviews"] = [review.to_dict() for review in reviews]
        newBusiness["amenities"] = [amenity.to_dict() for amenity in business_amenities_join]
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
    form = BusinessForm(
        # name = request_data["name"],
        # url = request_data["url"],
        # phone = request_data["phone"],
        # address = request_data["address"],
        # city = request_data["city"],
        # state = request_data["state"],
        # zip_code = request_data["zip_code"],
        # about = request_data["about"],
        # price = request_data["price"],
        # ownerId = request_data["ownerId"]
    )
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
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
        businessImage = BusinessImages(
            # url = request_data["imgUrl"],
            # preview = request_data["preview"],
            # businessId = newBusiness.id,
            # ownerId = request_data["ownerId"]
            url = data["imgUrl"],
            preview = data["preview"],
            businessId = newBusiness.id,
            ownerId = data["ownerId"]
        )
        db.session.add(businessImage)
        db.session.commit()
        return newBusiness.to_dict()
    print("ERRORS", form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

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

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

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
    Get all reviews for a business based on business id
    """
    reviews = Review.query.filter_by(businessId=id)
    if (reviews):
        return {'reviews': [review.to_dict() for review in reviews]}
    else:
        return {'errors': 'No reviews found for this business'}, 401

@business_routes.route("/")
def getAllBusinesses():
  businesses = Business.query.all();
  print(businesses)
  [business.to_dict() for business in businesses]
  return businesses


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
                "close_time": day.close_time.strftime("%H:%M:%S") if day.close_time else None
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


@business_routes.route("/<int:id>/edit", methods=["DELETE"])
def deleteBusiness(id):
    business = Business.query.get(id)

    if business:
        db.session.delete(business)
        db.session.commit()
        return business.to_dict()
    else:
        abort(404, "Business not found")
