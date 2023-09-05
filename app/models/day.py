from .db import db, environment, SCHEMA
from. business_hour import business_hours

class Day(db.Model):
  __tablename__ = "days"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  day = db.Column(db.Enum("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", name="days_type"))
  open_time = db.Column(db.Time)
  close_time = db.Column(db.Time)
  closed = db.Column(db.Boolean, nullable=False, default=False)
  dayIdx = db.Column(db.Integer)

  business_hours_days = db.relationship(
    "Business",
    secondary=business_hours,
    back_populates="business_days_hours"
  )

  def to_dict(self):
    return {
      "id": self.id,
      "day": self.day,
      "open_time": self.open_time.strftime('%H:%:M') if self.open_time else None,
      "close_time": self.close_time.strftime('%H:%:M') if self.open_time else None,
      "closed": self.closed,
      "dayIdx": self.dayIdx
    }
