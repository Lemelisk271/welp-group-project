from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from faker.providers import person, internet, address, date_time

fake = Faker()
fake.add_provider(person)
fake.add_provider(internet)
fake.add_provider(address)
fake.add_provider(date_time)

def generate_users():
    random_num = 1
    for _ in range(30):
        random_num = random_num + 1
        yield User(
            first_name = fake.first_name(),
            last_name = fake.last_name(),
            email = fake.free_email(),
            password = 'password',
            zip_code = fake.postcode(),
            birthday = fake.date_of_birth(),
            profile_image = f'https://picsum.photos/1280/720.jpg?random={random_num}'
        )

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name ='Demo',
        last_name = 'User',
        email='demo@aa.io',
        password='password',
        zip_code = fake.postcode(),
        birthday = fake.date_of_birth(),
        profile_image = 'https://picsum.photos/800/600.jpg')

    marnie = User(
        first_name='Marnie',
        last_name = 'Barney',
        email='marnie@aa.io',
        password='password',
        zip_code = fake.postcode(),
        birthday = fake.date_of_birth(),
        profile_image = 'https://picsum.photos/800/600.jpg')

    bobbie = User(
        first_name='Bobbie',
        last_name = 'Fingers',
        email='bobbie@aa.io',
        password='password',
        zip_code = fake.postcode(),
        birthday = fake.date_of_birth(),
        profile_image = 'https://picsum.photos/800/600.jpg')

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)

    generated_users = list(generate_users())
    generated_users.append(demo)
    generated_users.append(marnie)
    generated_users.append(bobbie)
    add_users = [db.session.add(user) for user in generated_users]
    db.session.commit()
    return generated_users


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
