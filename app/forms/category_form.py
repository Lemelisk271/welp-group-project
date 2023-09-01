from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Category, business_categories

class CategoryForm(FlaskForm):
    category = StringField("Category", validators=[DataRequired(), Length(min=0, max=100)])

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category
        }
