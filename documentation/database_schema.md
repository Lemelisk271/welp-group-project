# **Database Schema**

![Welp Database](images/welp_database.png)

## `users`

| column name   | data type    | details                               |
|---------------|--------------|---------------------------------------|
| id            | integer      | not null, primary key, auto increment |
| first_name    | varchar(40)  | not null                              |
| last_name     | varchar(40)  | not null                              |
| email         | varchar(100) | not null                              |
| password      | varchar(50)  | not null, unique                      |
| zip_code      | integer      | not null                              |
| birthday      | date         |                                       |
| profile_image | varchar(255) |                                       |

## `businesses`

| column name | data type    | details                               |
|-------------|--------------|---------------------------------------|
| id          | integer      | not null, primary key, auto increment |
| name        | varchar(100) | not null                              |
| url         | varchar(250) |                                       |
| phone       | varchar(14)  | not null                              |
| address     | varchar(255) | not null, unique                      |
| about       | text         |                                       |
| price       | integer      | not null, default = 1                 |
| ownerId     | integer      | references: users.id                  |

## `business_images`

| column name | data type    | details                               |
|-------------|--------------|---------------------------------------|
| id          | integer      | not null, primary key, auto increment |
| url         | varchar(250) | not null                              |
| businessId  | integer      | references: businesses.id             |
| userId      | integer      | references: users.id                  |

## `amenities`

| column name | data type   | details                               |
|-------------|-------------|---------------------------------------|
| id          | integer     | not null, primary key, auto increment |
| amenity     | varchar(50) | not null                              |

## `business_amenity`

| column name | data type | details                               |
|-------------|-----------|---------------------------------------|
| id          | integer   | not null, primary key, auto increment |
| businessId  | integer   | references: businesses.id             |
| amenityId   | integer   | references: amenities.id              |

## `reviews`

| column name | data type | details                               |
|-------------|-----------|---------------------------------------|
| id          | integer   | not null, primary key, auto increment |
| date        | date      | not null, default: "CURRENT_DATE"     |
| stars       | integer   | not null                              |
| userId      | integer   | references: users.id                  |
| businessId | integer   | references: businesses.id             |

Indexes: (userId, businessId), unique

## `days`

| column name | data type | details                               |
|-------------|-----------|---------------------------------------|
| id          | integer   | not null, primary key, auto increment |
| day         | enum      | [Mon, Tue, Wed, Thu, Fri, Sat, Sun]   |
| open_time   | time      |                                       |
| close_time  | time      |                                       |
| closed      | boolean   | not null, default = false             |
