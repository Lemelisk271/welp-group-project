from flask import Blueprint, jsonify, request
from app.models import db, Business, business_amenities, business_categories, business_hours, Amenity, Category, BusinessImages, Day, Question, Answer, Review

business_routes = Blueprint('businesses', __name__)


@business_routes.route("/<int:id>")
def getSingleBusiness(id):
    curr_business = Business.query.get(id)
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
