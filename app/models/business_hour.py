from .db import db, add_prefix_for_prod

business_hours = db.Table(
    'business_hours',
    db.Model.metadata,
    db.Column("businessId", db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id"))),
    db.Column("dayId", db.Integer, db.ForeignKey(add_prefix_for_prod("days.id")))
)


# ___________________________

# from .db import db, SCHEMA, add_prefix_for_prod


# class BusinessHour(db.Model):
#     __tablename__ = "business_hours"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     businessId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")))
#     dayId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("days.id")))

#     business = db.relationship("Business", back_populates="business_hours")
#     #! day = db.relationship("Day", back_populates="business_hours")

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "businessId": self.businessId,
#             "dayId": self.dayId
#         }


# TODO Add to Business if above doesn't work
# business_hours = db.relationship("BusinessHour", back_populates="business")
