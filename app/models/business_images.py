from .db import db, environment, SCHEMA, add_prefix_for_prod

class BusinessImages(db.Model):
  __tablename__ = "business_images"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  url = db.Column(db.String(250), nullable=False)
  preview = db.Column(db.Boolean, nullable=False, default=False)
  businessId = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
  ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

  business = db.relationship("Business", back_populates="business_images")
  user = db.relationship("User", back_populates="business_images")
