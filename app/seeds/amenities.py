from app.models import db, Amenity, environment, SCHEMA
from sqlalchemy.sql import text

all_amenities = [
  ("Offers Delivery", "/static/images/amenities/delivery.png"),
  ("Offers Takeout", "/static/images/amenities/takeout.png"),
  ("Masks Required", "/static/images/amenities/mask.png"),
  ("Staff wear masks", "/static/images/amenities/staff_mask.png"),
  ("Accepts Credit Cards", "/static/images/amenities/credit_cards.png"),
  ("Accepts Android Pay", "/static/images/amenities/android_pay.png"),
  ("Accepts Apple Pay", "/static/images/amenities/apple_pay.png"),
  ("Outdoor Seating", "/static/images/amenities/outdoor_seating.png"),
  ("Street Parking, Private Lot Parking", "/static/images/amenities/parking.png")
]

def generate_amenities():
  for amenity in all_amenities:
    yield Amenity(
      amenity = amenity[0],
      icon_url = amenity[1]
    )

def seed_amenities():
  amenities = list(generate_amenities())
  add_amenities = [db.session.add(amenity) for amenity in amenities]
  db.session.commit()
  return amenities

def undo_amenities():
  if environment == "production":
    sb.session.execute(f"TRUNCATE table {SCHEMA}.amenities RESTART IDENTITY CASCADE")
  else:
    db.session.execute(text("DELETE FROM amenities"))

  db.session.commit()
