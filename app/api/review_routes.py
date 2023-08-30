from flask import Blueprint, abort, request
from flask_login import login_required
from app.models import db, User, Review
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


@review_routes.route('/<int:id>')
def getReview(id):
    """
    Query for a specific review by id and returns it in a review dictionaries
    """
    get_review = Review.query.get(id)
    return get_review.to_dict()


@review_routes.route('/<int:id>', methods=["PUT"])
def editReview(id):
    """
    Update a specific review by id and returns it in a review dictionaries
    """
    request_data = request.get_json()
    print(request_data)
    if request_data:
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
    else:
        abort(404, "Review not found")