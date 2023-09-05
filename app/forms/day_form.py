from flask_wtf import FlaskForm
from wtforms import TimeField, BooleanField, StringField, IntegerField
from wtforms.validators import DataRequired

class DayForm(FlaskForm):

    # Day Table
    day = StringField("Day", validators=[DataRequired()])
    open_time = TimeField("Opening Time")
    close_time = TimeField("Closing Time")
    closed = BooleanField("Closed")
    dayIdx = IntegerField("dayIdx")
