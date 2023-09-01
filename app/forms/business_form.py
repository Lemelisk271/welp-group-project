from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.models import Business
# from ..api.AWS_helpers import ALLOWED_EXTENSIONS

# def address_exists(form, field):
#     address = field.data
#     ownerId = form.ownerId.data
#     business = Business.query.filter(Business.address == address).first()
#     # businessOwner = Business.query.filter(Business.ownerId == ownerId).first()
#     # user = User.query.filter(User.id == ownerId)
#     # print("HELLLLLLLLLP", businessOwner.ownerId != business.ownerId)
#     print("HELLLLLLLLLP", business.ownerId, form.ownerId.data, business.ownerId == ownerId)
#     if business:
#         if business.ownerId != ownerId:
#             raise ValidationError("Address is already in use")

# def validate_address(form, field):
#         existing_business = Business.query.filter_by(address=field.data).first()
#         if existing_business:
#             raise ValidationError("A business with this address already exists")

class BusinessForm(FlaskForm):


    state_choices = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
    ]

    name = StringField("Name", validators=[DataRequired(), Length(min=0, max=100)])
    # url = FileField("Image File", validators=[FileRequired, FileAllowed(list(ALLOWED_EXTENSIONS))])
    url = StringField("Image File", validators=[DataRequired(), Length(min=0, max=250)])
    phone = IntegerField("Phone", validators=[DataRequired()])
    address = StringField("Address", validators=[DataRequired(), Length(min=0, max=255)])
    city = StringField("City", validators=[DataRequired(), Length(min=0, max=100)])
    state = SelectField("State", validators=[DataRequired()], choices=state_choices)
    zip_code = IntegerField("ZipCode", validators=[DataRequired()])
    about = StringField("About")
    price = IntegerField("Price", validators=[DataRequired()], default=1)
    ownerId = IntegerField("OwnerId")
    submit = SubmitField("Submit")

    def to_dict(self):
        return {
            'name': self.name,
            'url': self.url,
            'phone': self.phone,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'about': self.about,
            'price': self.price,
            'ownerId': self.ownerId,
            'submit': self.submit
        }
