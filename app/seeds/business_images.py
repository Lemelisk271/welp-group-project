from app.models import db, BusinessImages, Business, environment, SCHEMA
from sqlalchemy.sql import text


# Create random business images
def generate_business_images():
    businesses = Business.query.all()
    # Create a preview image for each business
    for business in businesses:
        yield BusinessImages(
            url = 'https://picsum.photos/1280/720.jpg',
            preview = True,
            businessId = business.id,
            ownerId = business.ownerId
        )
        # Create non-preview images for each business
        for _ in range(5):
            yield BusinessImages(
                url = 'https://picsum.photos/1280/720.jpg',
                preview = False,
                businessId = business.id,
                ownerId = business.ownerId
            )

# Seed randomly generated business images to the business_images table
def seed_business_images():
    business_images = list(generate_business_images())
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