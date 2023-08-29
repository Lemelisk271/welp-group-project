from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
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
  id = IntegerField("id")
