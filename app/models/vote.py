from .db import db, environment, SCHEMA, add_prefix_for_prod

class Vote(db.Model):
    __tablename__ = "votes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    type = db.Column(db.Enum("Useful", "Funny", "Cool", name="vote_type"))
    reviewId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("reviews.id")), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    review = db.relationship("Review", back_populates="votes")
    user = db.relationship("User", back_populates="votes")

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "reviewId": self.reviewId,
            "userId": self.userId
        }
