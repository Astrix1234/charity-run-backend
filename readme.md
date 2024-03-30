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
- Create a .env file in the main project directory and configure environment variables (PORT, DB_HOST, SECRET, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, BACKEND_URL, FRONTEND_URL).
- Start the local server using npm start.

## API Usage

Once the server is running, the API is available at http://localhost:[PORT]/api/. Available endpoints:

#### Users:

- POST /api/users/signup - registers a new user.
  - <a href="https://monosnap.com/file/FaSK5Q9tNLeFVjo5AJYVA7JMZA0W9a" target="_blank">Screenshot: User Registration in Postman<a>
  - <a href="https://monosnap.com/file/KW8SpaQIAJTZZZrji3lFFIV146czuC" target="_blank">Screenshot: User Registration - Users Collection in MongoDB Compass<a>
- GET /api/users/verify/:verificationToken - verifies a user's email.
  - <a href="https://monosnap.com/file/Bhy6SEW7hmmIsBxMjo5MNov1afCCQm" target="_blank">Screenshot showing the verification email received by the user with the verification link<a>
  - <a href="https://monosnap.com/file/iIZuvuS6nwGMDPl1ryMV6V5cZPp4Z7" target="_blank">Screenshot showing the response from the localhost server for email verification in a browser using the verification token<a>
- POST /api/users/login - logs in a user.
  - <a href="https://monosnap.com/file/1QearrUEnnz8tTMYbPgq9fX4LEPWEi" target="_blank">Screenshot: User Login in Postman<a>
- PATCH `/api/users/participate` `auth(<bearer token>)` `body({ raceID, familyNr, km, time, status, paid, payment, shirt, shirtGender })` Add/update participation for specific race under current user. FamilyNr indicates which person to register/update for this race within same account starting with FamilyNr=0 as default.
- PATCH /api/users - update user data
- GET /api/users/logout - logs out a user.
  - <a href="https://monosnap.com/file/wzx7ReQLMecv0PcVfw8LRyKPxx2kIW" target="_blank">Screenshot: User Logout in Postman<a>
- GET /api/users/current - retrieves data of the currently logged-in user.
  - <a href="https://monosnap.com/file/DzhUArzRvQAk65ZdsxilbJC0lcdhst" target="_blank">Screenshot: Displaying the Current User in Postman<a>
- PATCH /api/users/avatars - updates a user's avatar.
  - <a href="https://monosnap.com/file/nB2cRb7BpTqF0S3pG9Lqulqsp2NWtb" target="_blank">Screenshot: Updating User Avatar in Postman<a>
  - <a href="https://monosnap.com/file/e8mAwkXi4IOyfr5BXPJY7kDsB3AFMF" target="_blank">Screenshot: Updated User Avatar - Users Collection in MongoDB Compass<a>


#### Race: 

- GET api/race - get all participants list from chosen race