from .db import db, environment, SCHEMA
from .business_category import business_categories


class Category(db.Model):
    __tablename__ = "categories"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    category = db.Column(db.VARCHAR(100), nullable=False)

    business_category = db.relationship("Business", secondary=business_categories, back_populates="categories_business")

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category
        }
