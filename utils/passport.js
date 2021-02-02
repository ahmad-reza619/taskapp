const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , models = require('../models');

function configurePassport() {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (username, password, done) {
      console.log({ username, password });
    }
  ));
}

module.exports = configurePassport;