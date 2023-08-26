from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import UniqueConstraint


class Question(db.Model):
    __tablename__ = "questions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False, default="CURRENT_DATE")
    businessId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")))
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    __table_args__ = (UniqueConstraint('userId', 'businessId'),)

    business = db.relationship("Business", back_populates="questions")
    user = db.relationship("User", back_populates="questions")
    answers = db.relationship("Answer", back_populates="questions")

    def to_dict(self):
        return {
            "id": self.id,
            "question": self.question,
            "date": self.date,
            "businessId": self.businessId,
            "userId": self.userId
        }
