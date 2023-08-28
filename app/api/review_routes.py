from flask import Blueprint
from flask_login import login_required
from app.models import Review

review_routes = Blueprint('reviews', __name__)

@review_routes.route("/user/<int:id>")
@login_required
def user_reviews(id):
  """
  Query for a review by user id and returns them iin a list of dictionaries.
  """
  reviews = Review.query.filter(Review.userId == id).all()
  return {"reviews": [review.to_dict() for review in reviews]}
