from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange
import email_validator
from app.models import User


def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')
    
def valid_zip(form, field):
    zip_code_length = len(str(field.data))
    if zip_code_length != 5:
        raise ValidationError('Zip-code must be 5 digits long')
    

class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(), Length(min=1, message="First Name cannot be empty"), Length(max=40, message="First Name cannot be more than 40 characters long")])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(min=1, message="Last Name cannot be empty"), Length(max=40, message="Last Name cannot be more than 40 characters long")])
    email = StringField('Email', validators=[DataRequired(), Email(message="Valid email required ex: name@myemail.com"), user_exists])
    password = StringField('Password', validators=[DataRequired(), Length(min=8, max=32, message="Password must be at least 8 characters long")])
    zip_code = IntegerField('Zip Code', validators=[NumberRange(min=00000, max=99999, message="Zip code must be a number."), valid_zip])