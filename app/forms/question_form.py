from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
  question = StringField("question", validators=[DataRequired()])
  businessId = IntegerField("businessId", validators=[DataRequired()])
  userId = IntegerField("userId", validators=[DataRequired()])
