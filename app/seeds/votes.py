from app.models import db, Vote, environment, SCHEMA
from sqlalchemy.sql import text
import random


def generate_votes(users, reviews):
    vote_options = ["Useful", "Funny", "Cool"]
    for review in reviews:
        sample_users = random.sample(users, 10)
        for user in sample_users:
            yield Vote(
                type = random.choice(vote_options),
                reviewId = review.id,
                userId = user.id
            )



def seed_votes(users, reviews):
    votes = list(generate_votes(users, reviews))
    add_items = [db.session.add(vote) for vote in votes]
    db.session.commit()
    return votes

def undo_votes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.votes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM votes"))

    db.session.commit()
