from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from faker.providers import date_time, lorem
import random

fake = Faker()
fake.add_provider(date_time)
fake.add_provider(lorem)


def generate_questions(businesses, users):
    for business in businesses:
        user = random.choice(users)
        yield Question(
            question = fake.sentence(nb_words=15)[:-1] + "?",
            date = fake.date_this_month(before_today=True, after_today=False),
            businessId = business.id,
            userId = user.id
        )

def seed_questions(businesses, users):
    questions = list(generate_questions(businesses, users))
    add_items = [db.session.add(question) for question in questions]
    db.session.commit()
    return questions

def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
