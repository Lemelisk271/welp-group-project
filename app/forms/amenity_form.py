from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Amenity, business_amenities

class AmenityForm(FlaskForm):
    amenity = StringField("Amenity", validators=[DataRequired(), Length(min=0, max=50)])
    icon_url = StringField("Icon Url")

    def to_dict(self):
        return {
        "amenity": self.amenity,
        "icon_url": self.icon_url
        }
