from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange
# from flask_wtf.file import FileField, FileAllowed, FileRequired
# from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class ReviewForm(FlaskForm):
    stars = IntegerField("Stars", validators=[DataRequired(), NumberRange(min=1, max=5)])
    review = StringField("Review", validators=[DataRequired(), Length(min=1, max=2000)])
    userId = IntegerField("UserId", validators=[DataRequired()])
    businessId = IntegerField("BusinessId", validators=[DataRequired()])
    submit = SubmitField("Submit")

    def to_dict(self):
        return {
            'stars': self.stars,
            'review': self.review,
            'userId': self.userId,
            'businessId': self.businessId
        }