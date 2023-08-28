from .db import db, add_prefix_for_prod, SCHEMA, environment

business_hours = db.Table(
    'business_hours',
    db.Model.metadata,
    db.Column("businessId", db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), primary_key=True),
    db.Column("dayId", db.Integer, db.ForeignKey(add_prefix_for_prod("days.id")), primary_key=True)
)

if environment == "production":
    business_hours.schema = SCHEMA

