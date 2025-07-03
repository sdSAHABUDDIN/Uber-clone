# Backend API DOCUMENTATION

## User Registration Endpoint

### /users/register

`POST /users/register`

#### Description

This endpoint allows a new user to register by providing their details. It validates the input data and creates a new user in the database.

#### Required Data

The request body must be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname`: A string representing the user's first name (minimum 3 characters).
  - `lastname`: A string representing the user's last name (minimum 3 characters).
- `email`: A string representing the user's email address (must be a valid email format).
- `password`: A string representing the user's password (minimum 6 characters).

##### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Status Codes

- `201 Created`: User registration successful.
- `400 Bad Request`: Validation errors in the request body.

---

## User Login Endpoint

### /users/login

`POST /users/login`

#### Description

This endpoint allows an existing user to log in using their email and password. If the credentials are valid, a JWT token is returned.

#### Required Data

The request body must be a JSON object containing the following fields:

- `email`: A string representing the user's email address (must be a valid email format).
- `password`: A string representing the user's password (minimum 6 characters).

##### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Status Codes

- `200 OK`: Login successful, returns a JWT token and user data.
- `400 Bad Request`: Validation errors in the request body.
- `401 Unauthorized`: Invalid email or password.

---

## Get User Profile Endpoint

### /users/profile

`GET /users/profile`

#### Description

This endpoint returns the profile information of the authenticated user. The request must include a valid authentication token (usually as a cookie or in the Authorization header).

#### Status Codes

- `200 OK`: Returns the user's profile data.
- `401 Unauthorized`: Missing or invalid authentication token.
- `404 Not Found`: User not found.

---

## User Logout Endpoint

### /users/logout

`GET /users/logout`

#### Description

This endpoint logs out the authenticated user by clearing the authentication token and blacklisting it.

#### Status Codes

- `200 OK`: User logged out successfully.

---

## Captain Registration Endpoint

### /captains/register

`POST /captains/register`

#### Description

This endpoint allows a new captain to register by providing their personal and vehicle details. It validates the input data, ensures the email and vehicle plate are unique, and creates a new captain in the database.

#### Required Data

The request body must be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname`: A string (minimum 3 characters).
  - `lastname`: A string (minimum 2 characters).
- `email`: A string (must be a valid email address).
- `password`: A string (minimum 6 characters).
- `phone`: A string (must be a valid phone number).
- `vehicle`: An object containing:
  - `color`: A string (3-20 characters).
  - `plate`: A string (1-13 uppercase letters/numbers, unique).
  - `capacity`: An integer (minimum 1).
  - `vehicleType`: A string, one of: `car`, `bike`, `van`.
  - `model`: A string (minimum 3 characters).

##### Example Request Body

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "strongpassword",
  "phone": "+1234567890",
  "vehicle": {
    "color": "Red",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car",
    "model": "Toyota Corolla"
  }
}
```

#### Status Codes

- `201 Created`: Captain registration successful.
- `400 Bad Request`: Validation errors, email or vehicle plate already exists.

---

## Captain Login Endpoint

### /captains/login

`POST /captains/login`

#### Description

This endpoint allows a captain to log in using their email and password. If the credentials are valid, a JWT token and captain data are returned.

#### Required Data

The request body must be a JSON object containing:

- `email`: A string (must be a valid email address).
- `password`: A string (minimum 6 characters).

##### Example Request Body

```json
{
  "email": "jane.smith@example.com",
  "password": "strongpassword"
}
```

#### Status Codes

- `200 OK`: Login successful, returns a JWT token and captain data.
- `400 Bad Request`: Validation errors in the request body.
- `401 Unauthorized`: Invalid email or password.

---

## Get Captain Profile Endpoint

### /captains/profile

`GET /captains/profile`

#### Description

This endpoint returns the profile information of the authenticated captain. The request must include a valid authentication token.

#### Status Codes

- `200 OK`: Returns the captain's profile data.
- `401 Unauthorized`: Missing or invalid authentication token.

---

## Captain Logout Endpoint

### /captains/logout

`GET /captains/logout`

#### Description

This endpoint logs out the authenticated captain by clearing the authentication token and blacklisting it.

#### Status Codes

- `200 OK`: Captain logged out successfully.

---

