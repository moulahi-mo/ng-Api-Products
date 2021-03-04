
## Contact

> Portfolio : https://moulahi.netlify.app/ 

> Email : moulahi.mo@gmail.com

> Phone : +212630385315



# Products API overview

> Backend API for products application, APi for Products E-commerce

![alt text](https://imgur.com/uSJOdtb.png)

# Demo

> The API is live at  [API Products](https://moulahi-api-products.herokuapp.com/) 

> Extensive documentation with examples :
>   [Documentation](https://documenter.getpostman.com/view/13825305/TWDfCsdr)   

For documentation choose an envirenement for the api docs

> " APi Products prod "

```
-Version: 1.0.0

-License: MIT

-Author: Moulahi Mohammed
```

# Usage

## Install Dependencies

```
npm install
```

## Run in prod mode

> npm start

Database Seeder
To seed the database with users, products, users and reviews with data from the "\_data" folder, run

## Destroy all data

> node seeder -d

## Import all data

> node seeder -i


# Details

# Products/reviews Backend API Specifications

Create the backend for a Products directory website. The frontend/UI will be created by another team (future review). The template has been created and can be used as a reference for functionality. All of the functionality below needs to be fully implmented in this project.

## Products

- List all Productss in the database
  - Pagination
  - Select specific fields in result
  - Limit number of results
  - Filter by fields
- Get single Product
- Create new Products
  - Authenticated users only
  - Must have the role "publisher" or "admin"
  - Only one Products per publisher (admins can create more)
  - Field validation via Mongoose
- Upload a photo for Products
  - Owner only
  - Photo will be uploaded to local filesystem
- Update Products
  - Owner only
  - Validation on update
- Delete Products
  - Owner only
- Calculate the average cost of all Products
- Calculate the average rating from the reviews for a Products

## Reviews

- List all reviews for Products
- List all reviews in general
  - Pagination, filtering, etc
- Get single review
- Create new review
  - Authenticated users only
  - Must have the role "publisher" or "admin"
  - Only the owner or an admin can create a review for a Products
  - Publishers can create multiple reviews
- Update review
  - Owner only
- Delete review
  - Owner only

## Users

- List all users for a Products
- List all users in general
  - Pagination, filtering, etc
- Get a single users
- Create a users
  - Authenticated users only
  - Must have the role "user" or "admin" (no publishers)
- Update users
  - Owner only
- Delete users
  - Owner only

## Users & Authentication

- Authentication will be ton using JWT/cookies
  - JWT and cookie should expire in 30 days
- User registration
  - Register as a "user" or "publisher"
  - Once registered, a token will be sent along with a cookie (token = xxx)
  - Passwords must be hashed
- User login
  - User can login with email and password
  - Plain text password will compare with stored hashed password
  - Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  - Cookie will be sent to set token = none
- Get user
  - Route to get the currently logged in user (via token)
- Password reset (lost password)
  - User can request to reset password
  - A hashed token will be emailed to the users registered email address
  - A put request can be made to the generated url to reset password
  - The token will expire after 10 minutes
- Update user info
  - Authenticated user only
  - Separate route to update password
- User CRUD
  - Admin only
- Users can only be made admin by updating the database field manually

## Security

- Encrypt passwords and reset tokens
- Prevent cross site scripting - XSS
- Prevent NoSQL injections
- Add a rate limit for requests of 100 requests per 15 minutes
- Protect against http param polution
- Add headers for security (helmet)
- Use cors to make API public (for now)

## Documentation

- Use Postman to create documentation
- Use docgen to create HTML files from Postman
- Add html files as the / route for the api

## Deployment (Heroku / Digital Ocean)

- Push to Github
- Create a droplet - https://m.do.co/c/5424d440c63a
- Clone repo on to server
- Use PM2 process manager
- Enable firewall (ufw) and open needed ports
- Create an NGINX reverse proxy for port 80
- Connect a domain name
- Install an SSL using Let's Encrypt

## Code Related Suggestions

- NPM scripts for dev and production env
- Config file for important constants
- Use controller methods with documented descriptions/routes
- Error handling middleware
- Authentication middleware for protecting routes and setting user roles
- Validation using Mongoose and no external libraries
- Use async/await (create middleware to clean up controller methods)
- Create a database seeder to import and destroy data
