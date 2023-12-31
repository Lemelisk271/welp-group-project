from .db import db, environment, SCHEMA, add_prefix_for_prod

business_amenities = db.Table(
  "business_amenities",
  db.Model.metadata,
  db.Column("businessId", db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), primary_key=True),
  db.Column("amenityId", db.Integer, db.ForeignKey(add_prefix_for_prod("amenities.id")), primary_key=True)
)

if environment == "production":
    business_amenities.schema = SCHEMA
