from .db import db, environment, SCHEMA

class Day(db.Model):
  __tablename__ = "days"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  day = db.Column(db.Enum("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"))
  open_time = db.Column(db.Time)
  close_time = db.Column(db.Time)
  closed = db.Column(db.Boolean, nullable=False, default=False)

  def to_dict(self):
    return {
      "id": self.id,
      "day": self.day,
      "open_time": self.open_time,
      "close_time": self.close_time,
      "closed": self.closed
    }
