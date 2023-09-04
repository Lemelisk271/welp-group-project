from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class AnswerForm(FlaskForm):
  answer = StringField("answer", validators=[DataRequired()])
  questionId = IntegerField("questionId", validators=[DataRequired()])
  userId = IntegerField("userId", validators=[DataRequired()])
