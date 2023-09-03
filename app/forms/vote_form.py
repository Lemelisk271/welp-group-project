from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, AnyOf

class VoteForm(FlaskForm):
  type = StringField("type", validators=[AnyOf(["Useful", "Funny", "Cool"])])
  reviewId = IntegerField("reviewId", validators=[DataRequired()])
  userId = IntegerField("userId", validators=[DataRequired()])
