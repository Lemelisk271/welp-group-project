from flask_wtf import FlaskForm
from wtforms import TimeField, BooleanField, StringField
from wtforms.validators import DataRequired

class DayForm(FlaskForm):

    # Day Table
    day = StringField("Day", validators=[DataRequired()])
    open_time = TimeField("Opening Time")
    close_time = TimeField("Closing Time")
    closed = BooleanField("Closed")

    # tueDay = StringField("Mon")
    # tueOpen = TimeField("Tuesday Opening Time", validators=[DataRequired()])
    # tueClose = TimeField("Tuesday Closing Time", validators=[DataRequired()])
    # tueIsClosed = BooleanField("Tuesday Closed", validators=[DataRequired()])

    # wedDay = StringField("Mon")
    # wedOpen = TimeField("Wednesday Opening Time", validators=[DataRequired()])
    # wedClose = TimeField("Wednesday Closing Time", validators=[DataRequired()])
    # wedIsClosed = BooleanField("Wednesday Closed", validators=[DataRequired()])

    # thuDay = StringField("Mon")
    # thuOpen = TimeField("Thursday Opening Time", validators=[DataRequired()])
    # thuClose = TimeField("Thursday Closing Time", validators=[DataRequired()])
    # thuIsClosed = BooleanField("Thursday Closed", validators=[DataRequired()])

    # friDay = StringField("Mon")
    # friOpen = TimeField("Friday Opening Time", validators=[DataRequired()])
    # friClose = TimeField("Friday Closing Time", validators=[DataRequired()])
    # friIsClosed = BooleanField("Friday Closed", validators=[DataRequired()])

    # satDay = StringField("Mon")
    # satOpen = TimeField("Saturday Opening Time", validators=[DataRequired()])
    # satClose = TimeField("Saturday Closing Time", validators=[DataRequired()])
    # satIsClosed = BooleanField("Saturday Closed", validators=[DataRequired()])

    # sunDay = StringField("Mon")
    # sunOpen = TimeField("Sunday Opening Time", validators=[DataRequired()])
    # sunClose = TimeField("Sunday Closing Time", validators=[DataRequired()])
    # sunIsClosed = BooleanField("Sunday Closed", validators=[DataRequired()])
