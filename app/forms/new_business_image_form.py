from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import IntegerField, BooleanField
from wtforms.validators import DataRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class NewBusinessImageForm(FlaskForm):
  businessId = IntegerField("businessId", validators=[DataRequired()])
  userId = IntegerField("userId", validators=[DataRequired()])
  image = FileField("image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
  preview = BooleanField("preview")
