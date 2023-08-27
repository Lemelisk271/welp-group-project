from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import sample, randint

fake = Faker()

def generate_reviews(users, businesses):
  for user in users:
    business_sample = sample(businesses, k=10)
    for business in business_sample:
      yield Review(
        date = fake.date_between(start_date='-1y', end_date='today'),
        stars = randint(1, 5),
        review = fake.text(),
        userId = user.id,
        businessId = business.id
      )

def seed_reviews(users, businesses):
  reviews = list(generate_reviews(users, businesses))
  add_reviews = [db.session.add(review) for review in reviews]
  db.session.commit()
  return reviews

def undo_reviews():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE")
  else:
    db.session.execute(text("DELETE FROM reviews"))

  db.session.commit()
