from .db import db, environment, SCHEMA, add_prefix_for_prod


class Answer(db.Model):
    __tablename__ = "answers"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    answer = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False, default="CURRENT_DATE")
    questionId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")))
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    questions = db.relationship("Question", back_populates="answers")
    user = db.relationship("User", back_populates="answers")

    def to_dict(self):
        return {
            "id": self.id,
            "answer": self.answer,
            "date": self.date,
            "questionId": self.questionId,
            "userId": self.userId
        }
