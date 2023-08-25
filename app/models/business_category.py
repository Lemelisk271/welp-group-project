from .db import db, add_prefix_for_prod

business_categories = db.Table(
    'business_categories',
    db.Model.metadata,
    db.Column("businessId", db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id"))),
    db.Column("categoryId", db.Integer, db.ForeignKey(add_prefix_for_prod("categories.id")))
)

# __________________________________

# from .db import db, SCHEMA, add_prefix_for_prod


# class BusinessCategory(db.Model):
#     __tablename__ = "business_categories"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, nullable=False, primary_key=True)
#     businessId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")))
#     categoryId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("categories.id")))

#     business = db.relationship("Business", back_populates="business_categories")
#     category = db.relationship("Category", back_populates="category")


#     def to_dict(self):
#         return {
#             "id": self.id,
#             "businessId": self.businessId,
#             "categoryId": self.categoryId
#         }



#TODO Add to Business model if above doesn't work
# business_categories = db.relationship("BusinessCategory", back_populates="business")

#TODO Add to Category model if above doesn't work
# business_categories = db.relationship("BusinessCategory", back_populates="category")
