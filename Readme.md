## Features

- User registration and authentication
- Train creation and management (admin only)
- Check train availability between source and destination
- Book seats on available trains (handled race conditions)
- View booking details

## Technologies Used

- Node.js
- Express.js
- MySQL
- JSON Web Tokens (JWT)
- bcrypt.js

## Installation

1. Clone the repository: `https://github.com/saikrishnasangu/IRCTC_Design.git`
2. Navigate to the project directory: `cd IRCTC_Design_problem`
3. Install dependencies: `npm install`
4. Create a `.env` file and set the following environment variables:
   - `HOST`: MySQL database host
   - `USER`: MySQL database user
   - `PASSWORD`: MySQL database password
   - `NAME`: MySQL database name
   - `JWT_SECRET`: Secret key for JWT token generation
   - `ADMIN_KEY`: Admin key for protected routes
5. Create the MySQL database and tables by running the SQL scripts in the `database` directory.
6. Start the server: `npm start`

## API Documentation

### Authentication

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Authenticate and obtain a JWT token

### Trains (Admin Only)

- `POST /trains/create`: Create a new train

### Bookings

- `GET /trains/availability?source=<source>&destination=<destination>`: Get available trains between source and destination
- `POST /bookings/book`: Book seats on a train
- `GET /bookings/details?trainId=<trainId>`: Get booking details for a specific train

### Users

- `GET /users/me`: Get user details (requires authentication)
