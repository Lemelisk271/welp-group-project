from flask_wtf import FlaskForm
from wtforms import TimeField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Day

class DayForm(FlaskForm):

    # Day Table
    monOpen = TimeField("Monday Opening Time", validators=[DataRequired()])
    monClose = TimeField("Monday Closing Time", validators=[DataRequired()])
    monIsClosed = BooleanField("Monday Closed", validators=[DataRequired()])

    tueOpen = TimeField("Tuesday Opening Time", validators=[DataRequired()])
    tueClose = TimeField("Tuesday Closing Time", validators=[DataRequired()])
    tueIsClosed = BooleanField("Tuesday Closed", validators=[DataRequired()])

    wedOpen = TimeField("Wednesday Opening Time", validators=[DataRequired()])
    wedClose = TimeField("Wednesday Closing Time", validators=[DataRequired()])
    wedIsClosed = BooleanField("Wednesday Closed", validators=[DataRequired()])

    thuOpen = TimeField("Thursday Opening Time", validators=[DataRequired()])
    thuClose = TimeField("Thursday Closing Time", validators=[DataRequired()])
    thuIsClosed = BooleanField("Thursday Closed", validators=[DataRequired()])

    friOpen = TimeField("Friday Opening Time", validators=[DataRequired()])
    friClose = TimeField("Friday Closing Time", validators=[DataRequired()])
    friIsClosed = BooleanField("Friday Closed", validators=[DataRequired()])

    satOpen = TimeField("Saturday Opening Time", validators=[DataRequired()])
    satClose = TimeField("Saturday Closing Time", validators=[DataRequired()])
    satIsClosed = BooleanField("Saturday Closed", validators=[DataRequired()])

    sunOpen = TimeField("Sunday Opening Time", validators=[DataRequired()])
    sunClose = TimeField("Sunday Closing Time", validators=[DataRequired()])
    sunIsClosed = BooleanField("Sunday Closed", validators=[DataRequired()])



    def to_dict(self):
        return {
            'mon_open': self.monOpen.data,
            'mon_close': self.monClose.data,
            'mon_is_closed': self.monIsClosed.data,
            'tue_open': self.tueOpen.data,
            'tue_close': self.tueClose.data,
            'tue_is_closed': self.tueIsClosed.data,
            'wed_open': self.wedOpen.data,
            'wed_close': self.wedClose.data,
            'wed_is_closed': self.wedIsClosed.data,
            'thu_open': self.thuOpen.data,
            'thu_close': self.thuClose.data,
            'thu_is_closed': self.thuIsClosed.data,
            'fri_open': self.friOpen.data,
            'fri_close': self.friClose.data,
            'fri_is_closed': self.friIsClosed.data,
            'sat_open': self.satOpen.data,
            'sat_close': self.satClose.data,
            'sat_is_closed': self.satIsClosed.data,
            'sun_open': self.sunOpen.data,
            'sun_close': self.sunClose.data,
            'sun_is_closed': self.sunIsClosed.data,
            'submit': self.submit.data
        }
