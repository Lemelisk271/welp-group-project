from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
# from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class BusinessForm(FlaskForm):
    # state_choices = [
    #     ("AL", "AL"),
    #     ("AK", "AK"),
    #     ("AZ", "AZ"),
    #     ("AR", "AR"),
    #     ("CA"),
    #     ("CO", "CO"),
    #     ("CT", "CT"),
    #     ("DE", "DE"),
    #     ("FL", "FL"),
    #     ("GA", "GA"),
    #     ("HI", "HI"),
    #     ("ID", "ID"),
    #     ("IL", "IL"),
    #     ("IN", "IN"),
    #     ("IA", "IA"),
    #     ("KS", "KS"),
    #     ("KY", "KY"),
    #     ("LA", "LA"),
    #     ("ME", "ME"),
    #     ("MD", "MD"),
    #     ("MA", "MA"),
    #     ("MI", "MI"),
    #     ("MN", "MN"),
    #     ("MS", "MS"),
    #     ("MO", "MO"),
    #     ("MT", "MT"),
    #     ("NE", "NE"),
    #     ("NV", "NV"),
    #     ("NH", "NH"),
    #     ("NJ", "NJ"),
    #     ("NM", "NM"),
    #     ("NY", "NY"),
    #     ("NC", "NC"),
    #     ("ND", "ND"),
    #     ("OH", "OH"),
    #     ("OK", "OK"),
    #     ("OR", "OR"),
    #     ("PA", "PA"),
    #     ("RI", "RI"),
    #     ("SC", "SC"),
    #     ("SD", "SD"),
    #     ("TN", "TN"),
    #     ("TX", "TX"),
    #     ("UT", "UT"),
    #     ("VT", "VT"),
    #     ("VA", "VA"),
    #     ("WA", "WA"),
    #     ("WV", "WV"),
    #     ("WI", "WI"),
    #     ("WY", "WY"),
    # ]
#     state_choices = [
#     ("AL"), ("AK"), ("AZ"), ("AR"), ("CA"), ("CO"), ("CT"), ("DE"), ("FL"), ("GA"),
#     ("HI"), ("ID"), ("IL"), ("IN"), ("IA"), ("KS"), ("KY"), ("LA"), ("ME"), ("MD"),
#     ("MA"), ("MI"), ("MN"), ("MS"), ("MO"), ("MT"), ("NE"), ("NV"), ("NH"), ("NJ"),
#     ("NM"), ("NY"), ("NC"), ("ND"), ("OH"), ("OK"), ("OR"), ("PA"), ("RI"), ("SC"),
#     ("SD"), ("TN"), ("TX"), ("UT"), ("VT"), ("VA"), ("WA"), ("WV"), ("WI"), ("WY"),
# ]
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
