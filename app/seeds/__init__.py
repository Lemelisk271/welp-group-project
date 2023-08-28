from flask.cli import AppGroup
from .users import seed_users, undo_users
from .businesses import seed_businesses, undo_businesses
from .business_images import seed_business_images, undo_business_images
from .amenities import seed_amenities, undo_amenities
from .questions import seed_questions, undo_questions
from .answers import seed_answers, undo_answers
from .reviews import seed_reviews, undo_reviews
from .categories import seed_categories, undo_categories
from .votes import seed_votes, undo_votes
from .days import seed_days, undo_days
from .review_comments import seed_review_comments, undo_review_comments

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_review_comments()
        undo_days()
        undo_votes()
        undo_answers()
        undo_questions()
        undo_business_images()
        undo_reviews()
        undo_businesses()
        undo_users()
        undo_categories()
        undo_amenities()
    # Add other seed functions here
    amenities = seed_amenities()
    categories = seed_categories()
    users = seed_users()
    businesses = seed_businesses(amenities, categories)
    reviews = seed_reviews(users, businesses)
    seed_business_images()
    seed_questions()
    seed_answers()
    seed_votes()
    seed_days(businesses)
    seed_review_comments(reviews)


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    undo_review_comments()
    undo_days()
    undo_votes()
    undo_answers()
    undo_questions()
    undo_business_images()
    undo_reviews()
    undo_businesses()
    undo_users()
    undo_categories()
    undo_amenities()
