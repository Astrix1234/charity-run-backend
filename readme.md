# Contactify - Contact Management API

Contactify is a modern REST API designed for managing contacts and user handling. The application enables management of a contact list, including adding, updating, deleting, and marking favorite contacts. Additionally, Contactify supports user registration, login, logout, and updating user subscription data.

Each registered user is assigned an avatar, which can subsequently be changed by the user at their discretion. This feature allows users to have a more personalized interaction with the application.

The registration process in Contactify includes email verification, providing additional security and confirming the user's identity. Upon registering, users receive an email with a verification link that they must click to activate their account. This verification system ensures that each account is properly linked to a valid email address, enhancing the credibility and security of using Contactify.

Contactify also provides an API for managing user profiles, enabling users to update their personal information and subscription preferences.

## Features

### Contact Management:

- Create, read, update, and delete contacts.
- Mark contacts as favorites.

### User Management:

- User registration and login.
- Email verification during registration, requiring users to click a verification link sent to their email address to activate their account.
- Update user subscription data.
- User logout.
- Retrieve data of the currently logged-in user.
- Assigning an initial avatar to each user upon registration, with the option for users to update their avatar later.
- Capability for users to manage and update their own profiles, including personal information and avatar changes.

## Technologies

- Node.js with Express.js for the backend, providing a robust framework for building efficient and scalable server-side applications.
- Mongoose for MongoDB interaction, facilitating object data modeling and database interaction in an asynchronous environment.
- Passport.js for authentication and JWT (JSON Web Tokens) handling, offering a flexible and modular approach to handling user authentication and secure token generation.
- Nodemailer for handling email operations, crucial for features like sending verification emails during user registration. This adds a layer of security and user verification to the application.
- CORS (Cross-Origin Resource Sharing) enabled, ensuring the API can securely handle requests from different domain origins.
- Dotenv for managing environment variables, allowing easy configuration of the application in different environments without code changes.
- Docker, with a custom Dockerfile created for the application, enabling easy deployment and environment consistency by containerizing the application. This facilitates smoother development, testing, and production workflows.

## Installation

To run the project locally, follow these steps:

- Clone the repository to your device.
- Install dependencies using npm install.
- Create a .env file in the main project directory and configure environment variables (PORT, DB_HOST, SECRET, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_KEY, BACKEND_URL).
- Start the local server using npm start.

## API Usage

Once the server is running, the API is available at http://localhost:[PORT]/api/. Available endpoints:

#### Contacts:

- GET /api/contacts - retrieves a list of contacts.
  - <a href="https://monosnap.com/file/1cMD7OWZBlx46CX1sW6CZW1xUteQr5" target="_blank">Screenshot: Displaying the Entire Contact List in Postman<a>
  - <a href="https://monosnap.com/file/e5xb3TNzccKEZRq1iu4XA7y3ADoGSb" target="_blank">Screenshot: Displaying the Contact List with Pagination in Postman<a>
  - <a href="https://monosnap.com/file/KFwgj0Bw6HmFvTsu9Sk62JuWzWangJ" target="_blank">Screenshot: Displaying the Favorite Contacts List with the 'favorite=true' Query in Postman<a>
- GET /api/contacts/:id - retrieves a specific contact by ID.
  - <a href="https://monosnap.com/file/JLrxLrmYmmdTH5pWHqWc9A7mBquSi7" target="_blank">Screenshot: Displaying a Specific Contact in Postman<a>
- POST /api/contacts - creates a new contact.
  - <a href="https://monosnap.com/file/xLpZjOyepXgIPYuyTYJ9wBOD03c2ay" target="_blank">Screenshot: Creating a New Contact in Postman<a>
  - <a href="https://monosnap.com/file/Qr7eHi472ixWvjMplxCFMQhyjXVPn7" target="_blank">Screenshot: Creating a New Contact - Contacts Collection in MongoDB Compass<a>
- PUT /api/contacts/:id - updates a contact by ID.
  - <a href="https://monosnap.com/file/RtmUTw1p7FG8lywxV1LCxtzsG6euUT" target="_blank">Screenshot: Updating a Contact in Postman<a>
  - <a href="https://monosnap.com/file/hm0VQWktr4DgS32wLPRjtQJaSnUJMN" target="_blank">Screenshot: Updating a Contact - Contacts Collection in MongoDB Compass<a>
- DELETE /api/contacts/:id - deletes a contact by ID.
  - <a href="https://monosnap.com/file/YX1LuZlGbl9E7uqzpRhTuna4UVVIHf" target="_blank">Screenshot: Deleting a Contact in Postman<a>
  - <a href="https://monosnap.com/file/isc5OuWsLgLeYJSPsikqn6IursD4bJ" target="_blank">Screenshot: Deleting a Contact - Contacts Collection in MongoDB Compass<a>
- PATCH /api/contacts/:id/favorite - marks a contact as a favorite.
  - <a href="https://monosnap.com/file/TwtFjXXhuYrEkR2uSy8GjDQJ2HPgXG" target="_blank">Screenshot: Marking a Contact as Favorite in Postman<a>
  - <a href="https://monosnap.com/file/jzSMwlXcKsadGUJJUNdKXO4XDRVb2F" target="_blank">Screenshot: Marking a Contact as Favorite - Contacts Collection in MongoDB Compass<a>

#### Users:

- POST /api/users/signup - registers a new user.
  - <a href="https://monosnap.com/file/FaSK5Q9tNLeFVjo5AJYVA7JMZA0W9a" target="_blank">Screenshot: User Registration in Postman<a>
  - <a href="https://monosnap.com/file/KW8SpaQIAJTZZZrji3lFFIV146czuC" target="_blank">Screenshot: User Registration - Users Collection in MongoDB Compass<a>
- GET /api/users/verify/:verificationToken - verifies a user's email.
  - <a href="https://monosnap.com/file/Bhy6SEW7hmmIsBxMjo5MNov1afCCQm" target="_blank">Screenshot showing the verification email received by the user with the verification link<a>
  - <a href="https://monosnap.com/file/iIZuvuS6nwGMDPl1ryMV6V5cZPp4Z7" target="_blank">Screenshot showing the response from the localhost server for email verification in a browser using the verification token<a>
- POST /api/users/login - logs in a user.
  - <a href="https://monosnap.com/file/1QearrUEnnz8tTMYbPgq9fX4LEPWEi" target="_blank">Screenshot: User Login in Postman<a>
- PATCH /api/users - updates a user's subscription.
  - <a href="https://monosnap.com/file/myoa3cc0fGcin36sHwUmPjsAFukLa5" target="_blank">Screenshot: Updating User Subscription in Postman<a>
  - <a href="https://monosnap.com/file/wfsKw7MML0kyf9mWeD5487UqYX8bDE" target="_blank">Screenshot: Updating User Subscription - Users Collection in MongoDB Compass<a>
- GET /api/users/logout - logs out a user.
  - <a href="https://monosnap.com/file/wzx7ReQLMecv0PcVfw8LRyKPxx2kIW" target="_blank">Screenshot: User Logout in Postman<a>
- GET /api/users/current - retrieves data of the currently logged-in user.
  - <a href="https://monosnap.com/file/DzhUArzRvQAk65ZdsxilbJC0lcdhst" target="_blank">Screenshot: Displaying the Current User in Postman<a>
- PATCH /api/users/avatars - updates a user's avatar.
  - <a href="https://monosnap.com/file/nB2cRb7BpTqF0S3pG9Lqulqsp2NWtb" target="_blank">Screenshot: Updating User Avatar in Postman<a>
  - <a href="https://monosnap.com/file/e8mAwkXi4IOyfr5BXPJY7kDsB3AFMF" target="_blank">Screenshot: Updated User Avatar - Users Collection in MongoDB Compass<a>
