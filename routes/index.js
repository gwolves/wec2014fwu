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

/* Public API list */
router.post('/signup', function(req, res) {
  post = req.body;

  user.create({
    username: post.username,
    password: post.password
  }, function (err, newbie) {
    if (err) {
      console.error(err);
    } else {
      console.log("user created");
      res.json({
        username: newbie.username,
        login_count: count
      });
    }
  });
});

router.post('/login', function(req, res) {
  var post = req.body;
  user.find({username: post.username}, function (err, docs) {
    console.log(docs);
  });
  res.end('login');
});

router.post('/clearData', function(req, res) {
  user.remove({}, function (err) {
    console.error(err);
  });
  //res.end('clear');
});

/* Aux API list */
router.post('/logout', function(req, res) {
  delete req.session.username;
  res.redirect('/login');
});


module.exports = router;
