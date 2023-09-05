from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField, FormField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Business
from .business_image_form import BusinessImageForm
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class BusinessForm(FlaskForm):


    state_choices = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
    ]

    name = StringField("Name", validators=[DataRequired(), Length(min=0, max=100)])
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
            'name': self.name.data,
            'url': self.url.data,
            'phone': self.phone.data,
            'address': self.address.data,
            'city': self.city.data,
            'state': self.state.data,
            'zip_code': self.zip_code.data,
            'about': self.about.data,
            'price': self.price.data,
            "imgUrl": self.imgUrl.data,
            'owner_id': self.ownerId.data,
            'submit': self.submit.data
        }
