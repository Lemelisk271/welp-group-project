from app.models import db, Business, environment, SCHEMA
from sqlalchemy.sql import text
import random
from faker import Faker
from faker.providers import company, internet, phone_number, address

fake = Faker()
fake.add_provider(company)
fake.add_provider(internet)
fake.add_provider(phone_number)
fake.add_provider(address)

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
def generate_businesses():
    for _ in range(100):
        yield Business(
            name = fake.company(),
            url = fake.domain_name(),
            phone = fake.msisdn(),
            address = fake.street_address(),
            city = fake.city(),
            state = random_state(),
            zip_code = fake.postcode(),
            about = fake.bs(),
            price = random_price(),
            ownerId = random_owner(),
        )

# Seed randomly generated businesses to the businesses table
def seed_businesses():
    businesses = list(generate_businesses())
    add_items = [db.session.add(business) for business in businesses]
    db.session.commit()
    return businesses

# Undo seeding
def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))
        
    db.session.commit()