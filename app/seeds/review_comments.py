from app.models import db, ReviewComment, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from faker.providers import date_time, lorem
import random

fake = Faker()
fake.add_provider(date_time)
fake.add_provider(lorem)


def generate_review_comments(reviews):
    sample_reviews = random.sample(reviews,200)
    for review in sample_reviews:
        yield ReviewComment(
            comment = fake.sentence(nb_words=20),
            date = fake.date_this_month(before_today=True, after_today=False),
            reviewId = review.id,
            businessId = review.businessId
        )

def seed_review_comments(reviews):
    review_comments = list(generate_review_comments(reviews))
    add_items = [db.session.add(review_comment) for review_comment in review_comments]
    db.session.commit()
    return review_comments

def undo_review_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM review_comments"))

    db.session.commit()
