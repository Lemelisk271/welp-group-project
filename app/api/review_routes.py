from flask import Blueprint, abort, request
from flask_login import login_required, current_user
from sqlalchemy import desc
from app.models import db, User, Review, Business
from ..forms import ReviewForm
from datetime import datetime

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
def reviews():
    """
    Query for all reviews and returns them in a list of review dictionaries
    """
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}

@review_routes.route('/recent')
def recent_reviews():
    """
    Query for recent review activity and returns them in a list of review dictionaries
    """
    reviews = Review.query.order_by(desc('date')).limit(12)
    recent_activity = []
    for review in reviews:
        business = Business.query.get(review.businessId)
        user = User.query.get(review.userId)
        recent_activity.append({
            "businessName": business.name,
            "userName": user.first_name,
            "userId": user.id,
            "reviewId": review.id,
            "stars": review.stars,
            "review": review.review,
            "date": review.date
        })
    return {'reviews': recent_activity}

@review_routes.route('/<int:id>')
def getReview(id):
    """
    Query for a specific review by id and returns it in a review dictionaries
    """
    get_review = Review.query.get(id)
    return get_review.to_dict()


@review_routes.route('/<int:id>', methods=["PUT"])
@login_required
def editReview(id):
    """
    Update a specific review by id and returns it in a review dictionaries
    """
    user = current_user.to_dict()
    review = Review.query.get(id)
    request_data = request.get_json()
    if user['id'] != review.userId:
        return {"errors": ["You are not authorized to update this review."]}
    updated_review = Review(
        id = id,
        stars = request_data["stars"],
        review = request_data["review"],
        userId = request_data["userId"],
        businessId = request_data["businessId"]
    )
    db.session.merge(updated_review)
    db.session.commit()
    return updated_review.to_dict()


@review_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_review(id):
    """
    Delete a specific review by id and returns it in a review dictionary
    """
    user = current_user.to_dict()
    review = Review.query.get(id)
    if user['id'] != review.userId:
        return {"errors": ["You are not authorized to delete this review."]}
    db.session.delete(review)
    db.session.commit()
    return review.to_dict()
