# API-Routes

This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

## User Authentication

- Authenticates a user.
  - `GET /api/auth/`
- Logs a user in.
  - `POST /api/auth/login`
- Logs a user out.
  - `GET /api/auth/logout`
- Creates a new user and logs them in.
  - `POST /api/auth/signup`
- Returns unauthorized JSON when flask-login authentication fails.
  - `GET /api/auth/unauthorized`

## User Routes

- Query for all users and returns them in a list of user dictionaries
  - `GET /api/users`
- Query for a user by id and returns that user in a dictionary.
  - `GET /api/users/<int:id>`
- Update a user's information.
  - `POST /api/users/update/<int:id>`
- Change a users profile picture by user id.
  - `POST /api/users/image/<int:id>`

## Review Routes

- Query for all reviews and returns them in a list of review dictionaries.
  - `GET /api/review`
- Query for recent review activity and returns them in a list of review dictionaries.
  - `GET /api/review/recent`
- Query for a specific review by id and returns it in a review dictionaries.
  - `GET /api/review/<int:id>`
- Update a specific review by id and returns it in a review dictionaries.
  - `PUT /api/review/<int:id>`
- Delete a specific review by id and returns it in a review dictionary.
  - `DELETE /api/review/<int:id>`

## Business Routes

- Query for all businesses and returns them in a list of business dictionaries.
  - `GET /api/business`
- Creates new business and returns it as a dictionary.
  - `POST /api/business/new`
- Creates a new image for a business by business id and returns it as a dictionary.
  - `POST /api/business/<int:id>images`
- Creates new hours for a business by business id and returns them as a dictionary.
  - `POST /api/business/<int:id>hours`
- Creates new categories for a business by business id and returns them as a dictionary.
  - `POST /api/business/<int:id>/categories`
- Creates new amenities for a business by business id and returns them as a dictionary.
  - `POST /api/business/<int:id>/amenities`
- Updates a business by id and returns it as a dictionary.
  - `PUT /api/business/<int:id>/edit`
- Post a new review for a business based on business id.
  - `POST /api/business/<int:id>/review`
- Get all reviews for a business based on business id including their votes.
  - `GET /api/business/<int:id>/review/all`
- Query for all business categories and returns them in a list of category dictionaries.
  - `GET /api/business/categories/all`
- Query for all business amenities and returns them in a list of amenity dictionaries.
  - `GET /api/business/amenities/all`
- Query for a single business by id and returns it as a dictionary.
  - `GET /api/business/<int:id>`
- Query that returns 8 random business categories.
  - `GET /api/business/categories`
- Delete a single business by id
  - `DELETE /api/business/<int:id>/edit`
- Delete a business image by image id. If the image is set as the preview image it sets another image as the new preview.
  - `DELETE /api/business/image/<int:id>`
- Adds a new image to a business. If the new image is set to be the preview image the old preview is set to false.
  - `POST /api/business/image/net`
- Adds a new question to a business.
  - `POST /api/business/question/new`
- Adds a new answer to a question.
  -  `POST /api/business/answer/new`
- Adds a new vote to a review.
  - `POST /api/business/vote/new`
