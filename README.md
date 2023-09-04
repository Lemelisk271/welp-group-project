# Welp

## Description
Checkout a live version of Welp here: [Welp Live](https://welp-686p.onrender.com/)

Welp is a clone of the yelp website, a business rating site. The backend of welp is built with python in a PostgreSQL database. Frontend rendering is handled with React.

## Table of Contents
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)

## Technologies

#### Python Dependencies:
- click 7.1.2
- gunicorn 20.1.0
- itsdangerous 2.0.1
- python-dotenv 0.14.0
- six 1.15.0
- alembic 1.6.5
- python-dateutil 2.8.1
- python-editor 1.0.4
- greenlet 1.1.0
- faker 18.13.0
- flask 2.0.1
- flask-cors 3.0.8
- flask-login 0.5.0
- flask-migrate 3.0.1
- flask-sqlalchemy 2.5.1
- flask-wtf 0.15.1
- jinja2 3.0.1
- mako 1.1.4
- markupsafe 2.0.1
- sqlalchemy 1.4.19
- werkzeug 2.0.1
- wtforms 2.3.3
- boto3 1.28.35
- email-validator 2.0.0.post2

#### React Dependencies:

- @testing-library/jest-dom 5.14.1
- @testing-library/react 11.2.7
- @testing-library/user-event 12.8.3
- clone-deep 4.0.1
- http-proxy-middleware 1.0.5
- react 17.0.2
- react-dom 17.0.2
- react-redux 7.2.4
- react-router-dom 5.2.0
- react-scripts 4.0.3
- redux 4.1.0
- redux-logger 3.0.6
- redux-thunk 2.3.0
- zipcodes 8.0.0

## Installation

Backend:
1. Make sure that you're in the root directory and run the following command:
    - ```pip install -r requirements.txt```
2. In the root directory create a ```.env``` file.
3. Copy the contents of the ```.env.example``` file into the ```.env``` file.
4. Replace ```<<secret>>``` with a secret of your own.
    - **Note:** You wont be able to add or change images without your own AWS login.
5. Run the following commands in the root directory and wait for each to complete before running the next command.
    - ```flask db upgrade```
    - ```flask seed all```
6. Now run the command to start the backend server:
    - ```pipenv run flask run```

Frontend:
1. Change directory to the "react-app" folder.
    - ```cd/react-app```
2. Install the dependencies by running the following command:
    - ```npm install```
3. In the "react-app" directory run the command to start the server:
    - ```npm start```
4. If a browser window doesn't open automatically you can open your own browser and navigate to:
    - [http://localhost:3000](http://localhost:3000)

## Usage

Live Link - [Welp](https://welp-686p.onrender.com)

### Screenshots

Landing Page:

![Landing Page](https://welp-group-project.s3.us-west-2.amazonaws.com/welp/landingPage.png)

Signup Form:

![Signup Form](https://welp-group-project.s3.us-west-2.amazonaws.com/welp/signUp.png)

Login Form:

![Login Form](https://welp-group-project.s3.us-west-2.amazonaws.com/welp/loginForm.png)

User Profile Page:

![User Profile Page](https://welp-group-project.s3.us-west-2.amazonaws.com/welp/userProfile.png)

Business Search Page:

![Business Search Page](https://welp-group-project.s3.us-west-2.amazonaws.com/welp/businessSearch.png)

All Businesses:

![All Businesses](https://welp-group-project.s3.us-west-2.amazonaws.com/welp/allBusinesses.png)

Business Details:

![Business Details Head](https://welp-group-project.s3.us-west-2.amazonaws.com/welp/businessDetails-head.png)
![Business Details Mid](https://welp-group-project.s3.us-west-2.amazonaws.com/welp/businessDetails-mid.png)
![Business Details Reviews](https://welp-group-project.s3.us-west-2.amazonaws.com/welp/businessDetails-reviews.png)

Add Business:

![Add Business Top](https://welp-group-project.s3.us-west-2.amazonaws.com/welp/addBusiness-top.png)
![Add Business Mid](https://welp-group-project.s3.us-west-2.amazonaws.com/welp/addBusiness-mid.png)
![Add Business Bottom](https://welp-group-project.s3.us-west-2.amazonaws.com/welp/addBusiness-bottom.png)

## Credits
- Daniel Lewis [GitHub Profile](https://github.com/akatheduelist)
- Darian Brooks [GitHub Profile](https://github.com/darocket34)
- Masood Saaed [GitHub Profile](https://github.com/MasoodMS95)
- Zach Smith [GitHub Profile](https://github.com/Lemelisk271)
