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
