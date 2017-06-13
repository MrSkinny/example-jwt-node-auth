## Node server with JWT Auth - example

All endpoints expect content type JSON.

Authorization header must follow format:
```
Authorization: JWT [jwt_encoded_string]

ex:
Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjajN1eGJscnYwMDAwaHJ6eXlpZzM0ejJtIiwiaWF0IjoxNDk3MzE5NTY3LCJleHAiOjE0OTc5MjQzNjd9.3hjshab6VdWV9K_Qt_HJbhiWJdZ_oJjzPl0-vFDhwIo

```


### Sign In
```
POST /api/sessions

No Authorization Header Required

Request Body:
{
  username: string (req),
  password: string (req)
}

Response: {
  username: string,
  token: jwt_encoded_string
}
```
It is expected that the client will store the `username` and `token` in session or local storage.

### Sign Out
```
DELETE /api/sessions

Authorization Header Required

Request Body: {}

Response:
200 - Success deleting token on User record
400 - Missing Authorization header
400 - Invalid JWT token or Authorization value
422 - JWT decoded but `sub` does not exist
```

### Protected endpoint
```
GET /api/users/me

Authorization Header Required

Response: {
  id: string,
  username: string,
  tokens: [
    {
      sub: string (user id),
      iat: unixtime (issued at),
      exp: unixtime (expiration-default 7 days) 
    }
  ]
}
```
