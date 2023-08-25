from .db import db, SCHEMA, add_prefix_for_prod
from sqlalchemy import UniqueConstraint


class ReviewComment(db.Model):
    __tablename__ = "review_comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    comment = db.Column(db.Integer, nullable=False)
    businessId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")))
    reviewId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("reviews.id")))

    __table_args__ = (UniqueConstraint('businessId', 'reviewId'),)

    business = db.relationship("Business", back_populates="review_comments")
    #! review = db.relationship("Review", back_populates="review_comments")


    def to_dict(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "businessId": self.businessId,
            "reviewId": self.reviewId
        }
