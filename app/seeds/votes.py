from app.models import db, Vote, environment, SCHEMA
from sqlalchemy.sql import text
import random


def generate_votes():
    vote_options = ["Useful", "Funny", "Cool"]
    unique_reviewIds = random.sample(range(1,50),40)
    for voteId in unique_reviewIds:
        yield Vote(
            type = random.choice(vote_options),
            reviewId = voteId,
            userId = random.randint(1,33)
        )


def seed_votes():
    votes = list(generate_votes())
    add_items = [db.session.add(vote) for vote in votes]
    db.session.commit()
    return votes

def undo_votes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.votes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM votes"))

    db.session.commit()
