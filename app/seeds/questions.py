from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from faker.providers import date_time, lorem
import random

fake = Faker()
fake.add_provider(date_time)
fake.add_provider(lorem)


def generate_questions():
    unique_businessIds = random.sample(range(1,100),60)
    for businessId in unique_businessIds:
        yield Question(
            question = fake.sentence(nb_words=15)[:-1] + "?",
            date = fake.date_this_month(before_today=True, after_today=False),
            businessId = businessId,
            userId = random.randint(1,33)
        )

def seed_questions():
    questions = list(generate_questions())
    add_items = [db.session.add(question) for question in questions]
    db.session.commit()
    return questions

def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
