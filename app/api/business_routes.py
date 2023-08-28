from flask import Blueprint, jsonify, request
from app.models import db, Business, business_amenities, Amenity, Category, BusinessImages, Day, Question, Review

business_routes = Blueprint('businesses', __name__)


@business_routes.route("/<int:id>")
def getSingleBusiness(id):
    curr_business = Business.query.get(id)
    business_reviews = Review.query.filter(Review.businessId == id).all()
    # business_amenities_join = business_amenities.query.filter(business_amenities.businessId == id).all()
    # business_amenities_list = [Amenity.query.filter(business_amenities_join.amenityId == id).all() for amenity in business_amenities_join]
    business_amenities_join = db.session.query(Amenity).join(
        business_amenities,
        business_amenities.c.amenityId == Amenity.id
    ).filter(business_amenities.c.businessId == id).all()
    biz_dict = curr_business.to_dict()
    reviews_dict = [review.to_dict() for review in business_reviews]
    amenities_dict = [amenity.to_dict() for amenity in business_amenities_list]
    questions_dict
    return {**biz_dict, "reviews": reviews_dict, "amenities": amenities_dict}


#  business_categories = Category.query.filter(Category.businessId == id).all()
#     business_questions = Question.query.filter(Question.businessId == id).all()
#     business_images = BusinessImages.query.filter(BusinessImages.businessId == id).all()
#     business_days = Day.query.filter(Day.businessId == id).all()
