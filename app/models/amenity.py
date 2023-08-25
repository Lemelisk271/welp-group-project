from .db import db, environment, SCHEMA

class Amenity(db.Model):
  __tablename__ = "amenities"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  amenity = db.Column(db.String(50), nullable=False)

  def to_dict(self):
    return {
      "id": self.id,
      "amenity": self.amenity
    }
