"""empty message

Revision ID: 01cc62246958
Revises: 
Create Date: 2023-08-26 20:42:58.504771

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '01cc62246958'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('amenities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('amenity', sa.String(length=50), nullable=False),
    sa.Column('icon_url', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('amenity')
    )
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('category', sa.VARCHAR(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('days',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('day', sa.Enum('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'), nullable=True),
    sa.Column('open_time', sa.Time(), nullable=True),
    sa.Column('close_time', sa.Time(), nullable=True),
    sa.Column('closed', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('zip_code', sa.Integer(), nullable=True),
    sa.Column('birthday', sa.Date(), nullable=True),
    sa.Column('profile_image', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('businesses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('url', sa.String(length=255), nullable=True),
    sa.Column('phone', sa.String(length=14), nullable=False),
    sa.Column('address', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=100), nullable=False),
    sa.Column('state', sa.Enum('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'), nullable=False),
    sa.Column('zip_code', sa.Integer(), nullable=False),
    sa.Column('about', sa.String(length=2000), nullable=True),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('address')
    )
    op.create_table('business_amenities',
    sa.Column('businessId', sa.Integer(), nullable=False),
    sa.Column('amenityId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['amenityId'], ['amenities.id'], ),
    sa.ForeignKeyConstraint(['businessId'], ['businesses.id'], ),
    sa.PrimaryKeyConstraint('businessId', 'amenityId')
    )
    op.create_table('business_categories',
    sa.Column('businessId', sa.Integer(), nullable=True),
    sa.Column('categoryId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['businessId'], ['businesses.id'], ),
    sa.ForeignKeyConstraint(['categoryId'], ['categories.id'], )
    )
    op.create_table('business_hours',
    sa.Column('businessId', sa.Integer(), nullable=False),
    sa.Column('dayId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['businessId'], ['businesses.id'], ),
    sa.ForeignKeyConstraint(['dayId'], ['days.id'], ),
    sa.PrimaryKeyConstraint('businessId', 'dayId')
    )
    op.create_table('business_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=250), nullable=False),
    sa.Column('preview', sa.Boolean(), nullable=False),
    sa.Column('businessId', sa.Integer(), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['businessId'], ['businesses.id'], ),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('questions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('question', sa.Text(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('businessId', sa.Integer(), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['businessId'], ['businesses.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('userId', 'businessId')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('stars', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(length=2000), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('businessId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['businessId'], ['businesses.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('userId', 'businessId')
    )
    op.create_table('answers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('answer', sa.Text(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('questionId', sa.Integer(), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['questionId'], ['questions.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('userId', 'questionId')
    )
    op.create_table('review_comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.Integer(), nullable=False),
    sa.Column('businessId', sa.Integer(), nullable=True),
    sa.Column('reviewId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['businessId'], ['businesses.id'], ),
    sa.ForeignKeyConstraint(['reviewId'], ['reviews.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('businessId', 'reviewId')
    )
    op.create_table('votes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.Enum('Useful', 'Funny', 'Cool', name='vote_type'), nullable=True),
    sa.Column('reviewId', sa.Integer(), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['reviewId'], ['reviews.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('userId', 'reviewId')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('votes')
    op.drop_table('review_comments')
    op.drop_table('answers')
    op.drop_table('reviews')
    op.drop_table('questions')
    op.drop_table('business_images')
    op.drop_table('business_hours')
    op.drop_table('business_categories')
    op.drop_table('business_amenities')
    op.drop_table('businesses')
    op.drop_table('users')
    op.drop_table('days')
    op.drop_table('categories')
    op.drop_table('amenities')
    # ### end Alembic commands ###
