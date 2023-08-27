from app.models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from faker.providers import date_time, lorem
import random

fake = Faker()
fake.add_provider(date_time)
fake.add_provider(lorem)


def generate_answers():
    unique_questionIds = random.sample(range(1,60),40)
    for questionId in unique_questionIds:
        yield Answer(
            answer = fake.paragraph(nb_sentences=5),
            date = fake.date_this_month(before_today=True, after_today=False),
            questionId = questionId,
            userId = random.randint(1,33)
        )

def seed_answers():
    answers = list(generate_answers())
    add_items = [db.session.add(answer) for answer in answers]
    db.session.commit()
    return answers

def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))

    db.session.commit()
