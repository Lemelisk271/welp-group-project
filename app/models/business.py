from .db import db, environment, SCHEMA, add_prefix_for_prod

class Business(db.Model):
  __tablename__ = "businesses"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  url = db.Column(db.String(255))
  phone = db.Column(db.String(14), nullable=False)
  address = db.Column(db.String(255), nullable=False, unique=True)
  city = db.Column(db.String(100), nullable=False)
  state = db.Column(db.Enum('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'), nullable=False)
  zip_code = db.Column(db.Integer, nullable=False)
  about = db.Column(db.String(2000))
  price = db.Column(db.Integer, nullable=False, default=1)
  ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

  user = db.relationship("User", back_populates="business")
  business_images = db.relationship("BusinessImages", back_populates="business")

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'url': self.url,
      'phone': self.phone,
      'address': self.address,
      'city': self.city,
      'state': self.state,
      'zip_code': self.zip_code,
      'about': self.about,
      'price': self.price,
      'ownerId': self.ownerId,
    }
