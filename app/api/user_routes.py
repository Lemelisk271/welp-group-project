from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Review, db
from app.forms import UpdateProfileForm, ProfileImageForm
from flask_login import current_user
from .AWS_helpers import remove_file_from_s3, get_unique_filename, upload_file_to_s3

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    reviews = Review.query.filter(Review.userId == id).all()
    userData = user.to_dict()
    userData['reviews'] = [review.to_dict() for review in reviews]
    return userData

@user_routes.route('/update/<int:id>', methods=["POST"])
@login_required
def update_profile(id):
    """
    Update a user's information.
    """
    user = current_user.to_dict()
    if user['id'] != id:
        return {"errors": ["You are not authorized to edit this user."]}
    form = UpdateProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_to_update = User.query.get(id)
        user_to_update.first_name = form.data['first_name']
        user_to_update.last_name = form.data['last_name']
        user_to_update.email = form.data['email']
        user_to_update.zip_code = form.data['zip_code']
        user_to_update.birthday = form.data['birthday']
        db.session.commit()
        return user_to_update.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@user_routes.route('/image/<int:id>', methods=["POST"])
@login_required
def update_image(id):
    """
    Changes a user's profile picture
    """
    user = current_user.to_dict()
    if user['id'] != id:
        return {"errors": ["You are not authorized to make this change."]}
    form = ProfileImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_to_update = User.query.get(id)

        oldImage = user_to_update.profile_image
        if oldImage:
            checkImage = oldImage.split("://")[1][0:4]
            if checkImage == "welp":
                deleted_file = remove_file_from_s3(oldImage)

        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return {"errors": upload}

        user_to_update.profile_image = upload['url']
        db.session.commit()

        return user_to_update.to_dict()
    print(form.data)
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
