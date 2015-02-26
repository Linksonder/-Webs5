var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/userManagement', function(req, res, next) {
  res.render('users');
});

router.get('/roomManagement', function(req, res, next) {
  res.render('rooms');
});



module.exports = router;
