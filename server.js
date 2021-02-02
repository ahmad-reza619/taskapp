// Env
require('dotenv').config();

// Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

// Controllers
const authController = require('./controllers/auth.controller');
const taskController = require('./controllers/task.controller');

// Models
const models = require('./models');

// Utility
const configurePassport = require('./utils/passport');

configurePassport();

const PORT = 3001;

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// Controller Registrations
app.use(authController);
app.use(taskController);

// Models Init
app.use((req, res, next) => {
  models.db.sync()
    .then(() => next())
    .catch(err => {
      console.error(err);
      res.json({ error: err })
    });
})

// Test the auth & display LEGENDARY Hello World
app.get('/api', (req, res) => {
  models.db.authenticate()
    .then(() => res.json({ success: true }))
    .catch(() => res.json({ success: false }));
})

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})