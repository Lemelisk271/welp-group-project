from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text


restaurant_food_categories = [
    "Mexican",
    "Chinese",
    "Italian",
    "Japanese",
    "Indian",
    "American",
    "French",
    "Mediterranean",
    "Thai",
    "Greek",
    "Vietnamese",
    "Korean",
    "Spanish",
    "Middle Eastern",
    "Brazilian",
    "Cajun",
    "German",
    "Russian",
    "Sushi",
    "Seafood",
    "Steakhouse",
    "Burger",
    "Pizza",
    "Sushi",
    "Vegetarian",
    "Vegan",
    "Gluten-free",
    "Food Truck",
    "Café",
    "Barbecue",
    "Diner",
    "Fast Food",
    "Ice Cream",
    "Dessert",
    "Bakery",
    "Coffee Shop",
    "Juice Bar",
    "Tea House",
    "Pasta",
    "Sandwich",
    "Noodle",
    "Salad",
    "Soup",
    "Poke",
    "Bistro",
    "Tapas",
    "Food Court",
    "Buffet",
    "Food Stand",
    "Food Market",
    "Gourmet",
    "Fusion",
    "Ramen",
    "Doughnut",
    "Cupcake",
    "Bagel",
    "Ethiopian",
    "Turkish",
    "Peruvian",
    "Hawaiian",
    "Irish",
    "African",
    "Caribbean",
    "Polish",
    "Soul Food",
    "Indonesian",
    "Malaysian",
    "Scandinavian",
    "Ukrainian",
    "Afghan",
    "Armenian",
    "Bangladeshi",
    "Cuban",
    "Filipino",
    "Georgian",
    "Iranian",
    "Israeli",
    "Jamaican",
    "Lebanese",
    "Moroccan",
    "Nepalese",
    "Pakistani",
    "Romanian",
    "Singaporean",
    "Sri Lankan",
    "Swiss",
    "Tibetan",
    "Uzbek",
    "Venezuelan",
    "West African"
]

def generate_categories():
    for category in restaurant_food_categories:
        yield Category(
            category = category
        )

def seed_categories():
    categories = list(generate_categories())
    add_items = [db.session.add(category) for category in categories]
    db.session.commit()
    return categories

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
