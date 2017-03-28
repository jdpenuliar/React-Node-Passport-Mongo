const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy (localOptions, (email, password, done) => {
  // verify this email adn password, call done with user
  // if true
  // else, call done with false
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    //compare password
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user Id in the payload exists in our database
  // If it does, call 'done' with that user
  // else, call 'done' without a user object
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  })
});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
