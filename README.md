# JWT AUTHENTICATION

This package provides functions for managing user authentication, including password hashing, password comparison for authentication, and JWT token verification

This package provides functions for managing user authentication, including:

- password hashing
- password comparison and token creation for authentication
- Jwt token verification

# Installing

```bash
npm i jwt-auths-module
```

# Usage

## 1. hashPassowrd

This function hash password using bcrypt

**Example**

```javascript
const { hashPassword } = require("jwt-auths-module");

hashPassword(password)
  .then((hashPassword) => {
    // save user info in your db with hashPassword
  })
  .catch((err) => {
    console.error(err);
  });
```

## 2. authenticateUser

This function compares a password with a hashed password and creates a JWT token if the passwords match.

**Example**

```javascript
const { authenticateUser } = require("jwt-auths-module");

authenticateUser(hashedPassword, myPassword, userId, mySecretKey)
  .then((token) => {
    // return the token
  })
  .catch((err) => {
    console.error(err);
  });
```

## 3. VerifyToken

This function intercepts an HTTP request and verifies the JWT token in the request headers.

**Example**

```javascript
const express = require("express");
const { verifyJwtToken } = require("jwt-auths-module");

const app = express();
const secretKey = "mySecretKey";

app.use(verifyJwtToken(secretKey));

app.get("/protected-route", (req, res) => {
  res.send(`Hello, user ${req.ID}`);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
```
