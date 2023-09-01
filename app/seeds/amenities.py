from app.models import db, Amenity, environment, SCHEMA
from sqlalchemy.sql import text

all_amenities = [
  ("Offers Delivery", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/delivery.png"),
  ("Offers Takeout", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/takeout.png"),
  ("Masks Required", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/mask.png"),
  ("Staff wear masks", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/staff_mask.png"),
  ("Accepts Credit Cards", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/credit_cards.png"),
  ("Accepts Android Pay", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/android_pay.png"),
  ("Accepts Apple Pay", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/apple_pay.png"),
  ("Outdoor Seating", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/outdoor_seating.png"),
  ("Street Parking, Private Lot Parking", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/parking.png"),
  ("Free Wi-Fi", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/wi_fi.png"),
  ("Dogs Allowed", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/dog.png"),
  ("Wheelchair Accessible", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/wheelchair.png"),
  ("Offers Catering", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/catering.png"),
  ("No Alcohol", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/no_alcohol.png"),
  ("Bike Parking", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/bike.png"),
  ("Compostable Containers Available", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/compost_bin.png"),
  ("Plastic-Free Packaging", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/no_plastic_bag.png"),
  ("Good For Kids", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/kids.png"),
  ("Good for Groups", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/groups.png"),
  ("Drive-Thru", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/drive_thru.png"),
  ("Vegan Options", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/vegan.png"),
  ("Romantic", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/romantic.png"),
  ("Casual Dress", "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/casual_dress.png")
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
    db.session.execute(f"TRUNCATE table {SCHEMA}.amenities RESTART IDENTITY CASCADE")
  else:
    db.session.execute(text("DELETE FROM amenities"))

  db.session.commit()
