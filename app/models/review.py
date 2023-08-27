from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from sqlalchemy import UniqueConstraint

class Review(db.Model):
  __tablename__ = 'reviews'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  date = db.Column(db.DateTime, default=datetime.datetime.now)
  stars = db.Column(db.Integer, nullable=False, default=1)
  review = db.Column(db.String(2000), nullable=False)
  userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  businessId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), nullable=False)

  __table_args__ = (UniqueConstraint('userId', 'businessId'),)

  user = db.relationship("User", back_populates="review")
  business = db.relationship("Business", back_populates="review")
  votes = db.relationship("Vote", back_populates="review")
  review_comments = db.relationship("ReviewComment", back_populates="review")

  def to_dict(self):
    return {
      "id": self.id,
      "date": self.date,
      "stars": self.stars,
      "userId": self.userId,
      "businessId": self.businessId
    }
