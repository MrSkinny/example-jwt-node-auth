const express = require('express');
const app = express();
const jsonParser = require('body-parser').json();

const cors = require('./middleware/cors');
const passport = require('./passport-config');
const initRoutes = require('./routes');

// Creates an admin user for demonstration - u: 'admin' | p: 'password'
require('./seed');

app.use(cors);
app.use(jsonParser);
app.use(passport.initialize());
initRoutes(app);

app.listen(8080, () => console.log('Server on 8080'));
