from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def email_exists(form, field):
  email = field.data
  id = field.data
  userQuery = User.query.filter(User.email == email).first()
  if user:
    if user.id != id:
      raise ValidationError('Email address is already in use.')

class UpdateProfileForm(FlaskForm):
  id = IntegerField("id", validators=[DataRequired()])
  first_name = StringField("first_name", validators=[DataRequired()])
  last_name = StringField("last_name", validators=[DataRequired()])
  email = StringField("email", validators=[DataRequired()])
  zip_code = IntegerField("zip_code", validators=[DataRequired()])
  birthday = DateField("birthday")
