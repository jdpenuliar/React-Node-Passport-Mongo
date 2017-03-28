const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = (req, res, next) => {
  // user has already had their email and password authenticated
  // we just give them a token
  res.send({ token: tokenForUser(req.user) }) 
};

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({
      error: 'You must provide email and password',
    });
  }

  // see if user with given email exist
  User.findOne({
    email,
  }, (err, data) => {
    if (err) {
      return next(err);
    }
    // If a user with email does exist, return error
    // 422 unprocecable entity
    if (data) {
      return res.status(422).send({ error: 'Email is in use' });
    }
  });
  // if a user with email doesnt exist, create and save user record
  const user = new User({
    email,
    password,
  });
  user.save((err) =>{
    if (err) {
      return next(err);
    }
    // respond to request
    res.json({ token: tokenForUser(user) }); 
  });
}
