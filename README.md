## Node server with JWT Auth - example

All endpoints expect content type JSON.

HTTP authorization header must follow format:
```
Authorization: JWT [jwt_encoded_string]

ex:
Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjajN1eGJscnYwMDAwaHJ6eXlpZzM0ejJtIiwiaWF0IjoxNDk3MzE5NTY3LCJleHAiOjE0OTc5MjQzNjd9.3hjshab6VdWV9K_Qt_HJbhiWJdZ_oJjzPl0-vFDhwIo

```

### JWT Payload

The server generates tokens with the following payload:

```
{
  iat: unixtime (issued at),
  exp: unixtime (expires at),
  sub: string (user id)
}
```

These get stored in a `tokens` field on the User model. Every sign in generates a new token and deleted when a Sign Out occurs.

The server verifies a token is valid by
1) Decoding the JWT encoded string - this will fail if it's a malformed string or doesn't match the server secret
2) Fetching the user record matching the `sub` field, and then ensuring a token exists in `tokens` with a matching `iat`

The second step ensures that a valid JWT token still won't authorize if the user signed out from that device previously.

### Sign In
```
POST /api/sessions

No Authorization Header Required

Request Body:
{
  username: string (req),
  password: string (req)
}

Response:
400 - username/password omitted
401 - user not found
401 - invalid password
200 - {
  username: string,
  token: jwt_encoded_string
}
```
It is expected that the client will store the `username` and `token` in session or local storage.

### Sign Out

This endpoint checks if:
1) The token is valid and matches server secret
2) The token's iat (issued at) matches with a token stored in User record 

```
DELETE /api/sessions

Authorization Header Required

Request Body: {}

Response:
400 - Missing Authorization header
400 - Invalid JWT token or Authorization value
422 - JWT decoded but `sub` does not exist
200 - Success deleting token on User record
```

### Protected endpoint
```
GET /api/users/me

Authorization Header Required


Response:
401 - Default passport unauthorized 
200 - {
  id: string,
  username: string,
  tokens: array (of jwt payloads)
}
```
