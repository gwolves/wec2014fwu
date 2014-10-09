var express = require('express');
var router = express.Router();
var user = require('../models/user');

function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/welcome', function(req, res) {
  res.render('welcome', { title: 'Express', username: 'gwolves', count: 20 });
});

/* Public API list */
router.post('/signup', function(req, res) {
  post = req.body;

  user.create({
    username: post.username,
    password: post.password
  }, function (err, newbie) {
    if (err) {
      if (err.name === "ValidationError") {
        if (err.errors.username && err.errors.username.message === "username length") {
          res.json({error_code: -1});
        } else if (err.errors.password && err.errors.password.message === "password length") {
          res.json({error_code: -2});
        }
      } else if (err.name === "MongoError" && err.code === 11000) {
        res.json({error_code: -3});
      }
      console.error(err);
    } else {
      console.log('user created');
      req.session.username = newbie.username;
      newbie.incCount();
      res.json({
        user_name: newbie.username,
        login_count: newbie.count
      });
    }
  });
});

router.post('/login', function(req, res) {
  var post = req.body;
  user.findOne({username: post.username}, function (err, doc) {
    if (err) {
      console.error(err);
    } else {
      if (doc === null || !doc.authenticate(post.password)) {
        res.json({error_code: -4});
      } else {
        req.session.username = doc.username;
        doc.incCount();
        res.json({
          user_name: doc.username,
          login_count: doc.count
        });
      }
      console.log(doc);
    }
  });
});

router.post('/clearData', function(req, res) {
  user.remove({}, function (err) {
    if (err) {
      console.error(err);
    }
    res.end();
  });
});

/* Aux API list */
router.post('/logout', function(req, res) {
  delete req.session.username;
  res.redirect('/');
});

module.exports = router;
