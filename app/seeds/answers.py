from app.models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from faker.providers import date_time, lorem
import random

fake = Faker()
fake.add_provider(date_time)
fake.add_provider(lorem)


def generate_answers(questions, users):
    for question in questions:
        user = random.choice(users)
        yield Answer(
            answer = fake.paragraph(nb_sentences=5),
            date = fake.date_this_month(before_today=True, after_today=False),
            questionId = question.id,
            userId = user.id
        )

def seed_answers(questions, users):
    answers = list(generate_answers(questions, users))
    add_items = [db.session.add(answer) for answer in answers]
    db.session.commit()
    return answers

def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))

    db.session.commit()
