from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import IntegerField
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class ProfileImageForm(FlaskForm):
  id = IntegerField("id")
  image = FileField("image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
