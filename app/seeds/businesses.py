from app.models import db, Business, environment, SCHEMA
from sqlalchemy.sql import text
import random
from faker import Faker
from faker.providers import company, internet, phone_number, address, phone_number, lorem

fake = Faker()
fake.add_provider(company)
fake.add_provider(internet)
fake.add_provider(phone_number)
fake.add_provider(address)
fake.add_provider(lorem)

def random_state():
    states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
    random_state_index = random.randint(0,49)
    return states[random_state_index]

# Create a random ownerId
def random_owner():
    return random.randint(1, 3)

# Choose a random price
def random_price():
    return random.randint(1, 4)

# Create random business information
def generate_businesses(amenities, categories):
    for _ in range(40):
        state = random_state()
        yield Business(
            name = fake.company(),
            url = f"https://{fake.domain_name()}",
            phone = fake.numerify(text='(###) ###-####'),
            address = fake.street_address(),
            city = fake.city(),
            state = state,
            zip_code = fake.postcode_in_state(state),
            about = fake.paragraph(),
            price = random_price(),
            ownerId = random_owner(),
            categories_business = random.sample(categories, k=random_price()),
            business_business_amenities = random.sample(amenities, k=5)
        )

# Seed randomly generated businesses to the businesses table
def seed_businesses(amenities, categories):
    businesses = list(generate_businesses(amenities, categories))
    add_items = [db.session.add(business) for business in businesses]
    db.session.commit()
    return businesses

# Undo seeding
def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.business_amenities RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.business_categories RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM business_categories"))
        db.session.execute(text("DELETE FROM business_amenities"))
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()
