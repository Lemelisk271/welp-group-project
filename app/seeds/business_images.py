from app.models import db, BusinessImages, Business, environment, SCHEMA
from sqlalchemy.sql import text
import random


# Create random business images
def generate_business_images(users):
    businesses = Business.query.all()
    # Create a preview image for each business
    random_num = 1
    for business in businesses:
        random_num = random_num + 1
        yield BusinessImages(
            url = f'https://picsum.photos/1280/720.jpg?random={random_num}',
            preview = True,
            businessId = business.id,
            ownerId = business.ownerId
        )
        # Create non-preview images for each business
        for _ in range(5):
            random_num = random_num + 1
            randomUser = random.choice(users)
            yield BusinessImages(
                url = f'https://picsum.photos/1280/720.jpg?random={random_num}',
                preview = False,
                businessId = business.id,
                ownerId = randomUser.id
            )

# Seed randomly generated business images to the business_images table
def seed_business_images(users):
    business_images = list(generate_business_images(users))
    add_items = [db.session.add(business_image) for business_image in business_images]
    db.session.commit()
    return business_images

# Undo seeding
def undo_business_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM business_images"))

    db.session.commit()
