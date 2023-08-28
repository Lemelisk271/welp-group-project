from .db import db, SCHEMA, add_prefix_for_prod, environment

class ReviewComment(db.Model):
    __tablename__ = "review_comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    date  = db.Column(db.Date, nullable=False)
    comment = db.Column(db.String, nullable=False)
    businessId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")))
    reviewId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("reviews.id")))

    business = db.relationship("Business", back_populates="review_comments")
    review = db.relationship("Review", back_populates="review_comments")


    def to_dict(self):
        return {
            "id": self.id,
            "date": self.date,
            "comment": self.comment,
            "businessId": self.businessId,
            "reviewId": self.reviewId
        }
