from .db import db, environment, SCHEMA
from .business_amenities import business_amenities

class Amenity(db.Model):
  __tablename__ = "amenities"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  amenity = db.Column(db.String(50), nullable=False)
  icon_url = db.Column(db.String(255))

  amenity_business_amenities = db.relationship(
    "Business",
    secondary=business_amenities,
    back_populates="business_business_amenities"
  )

  def to_dict(self):
    return {
      "id": self.id,
      "amenity": self.amenity,
      "icon_url": self.icon_url
    }
