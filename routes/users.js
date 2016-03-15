var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var utils = require('../utils/index');

if (!process.env.JWT_SECRET) {
  console.error('ERROR!: Please set JWT_SECRET before running the app. \n run: export JWT_SECRET=<some secret string> to set JWTSecret. ')
  process.exit();
}

var userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  image: String,
  admin: Boolean,
  isEmailVerified: Boolean
});

userSchema.plugin(timestamps);

var User = mongoose.model('User', userSchema);

//utility func
function isUsernameUnique(username, cb) {
  User.findOne({
    'username': new RegExp(username, "i")
  }, function(err, user) {
    if (err) throw err;

    cb(user ? false : true);
  });
}


router.get('/users/?', function(req, res) {

  if (!req.user || !req.user.admin)
    return res.status(401).json({
      error: 'You must be admin to access this route.'
    });

  User
    .find({})
    .select({
      password: 0,
      __v: 0,
      updatedAt: 0,
      createdAt: 0
    }) //make sure to not return password (although it is hashed using bcrypt)
    .limit(100)
    .sort({
      createdAt: -1
    })
    .exec(function(err, users) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: 'Could not retrieve users'
        });
      }
      res.json(users);
    });
});

router.post('/users/signin', function(req, res) {
  User
    .findOne({
      username: req.body.username
    })
    .select({
      __v: 0,
      updatedAt: 0,
      createdAt: 0
    }) //make sure to not return password (although it is hashed using bcrypt)
    .exec(function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(404).json({
          error: true,
          message: 'Username or Password is Wrong'
        });
      }


      bcrypt.compare(req.body.password, user.password, function(err, valid) {
        if (!valid) {
          return res.status(404).json({
            error: true,
            message: 'Username or Password is Wrong'
          });
        }

        //make sure to NOT pass password and anything sensitive inside token
        //Pass anything tht might be used in other parts of the app
        var token = utils.generateToken(user);

        user = utils.getCleanUser(user);

        res.json({
          user: user,
          token: token
        });
      });
    });
});



router.post('/users/signup', function(req, res, next) {
  var body = req.body;

  var errors = utils.validateSignUpForm(body);
  if (errors) {
    return res.status(403).json(errors);
  }

  isUsernameUnique(body.username.trim(), function(isUnique) {
    if (!isUnique) {
      res.status(403).json({
        username: 'Username "' + username + '" is not unique!'
      });
    }

    var hash = bcrypt.hashSync(body.password.trim(), 10);
    var user = new User({
      name: body.name.trim(),
      username: body.username.trim(),
      email: body.email.trim(),
      password: hash,
      admin: false,
      isEmailVerified: false
    });

    user.save(function(err, user) {
      if (err) throw err;

      var token = utils.generateToken(user);

      user = utils.getCleanUser(user);

      res.json({
        user: user,
        token: token
      });
    });

  });
});



//currently validating uniqueness for username
router.post('/users/validate/fields', function(req, res, next) {
  var body = req.body;

  var username = body.username ? body.username.trim() : '';
  isUsernameUnique(username, function(isUnique) {
    if (!isUnique) {
      res.status(403).json({
        username: 'Username "' + username + '" is not unique!'
      });
    } else {
      return res.json({});
    }
  });
});

//get current user from token
router.get('/me/from/token', function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      message: 'Must pass token'
    });
  }

  // decode token
  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err) throw err;

    //return user using the id from w/in JWTToken
    User.findById({
      '_id': user._id
    }, function(err, user) {
      if (err) throw err;

      user = utils.getCleanUser(user); //dont pass password and stuff

      //note: you can renew token by creating new token(i.e. refresh it) w/ new expiration time at this point, but I'm passing the old token back.
      // var token = utils.generateToken(user);

      res.json({
        user: user,
        token: token
      });

    });
  });
});



module.exports = router;