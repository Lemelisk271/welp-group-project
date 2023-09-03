from .db import db, add_prefix_for_prod, environment, SCHEMA

business_categories = db.Table(
    'business_categories',
    db.Model.metadata,
    db.Column("businessId", db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), primary_key=True),
    db.Column("categoryId", db.Integer, db.ForeignKey(add_prefix_for_prod("categories.id")), primary_key=True)
)

if environment == "production":
    business_categories.schema = SCHEMA

