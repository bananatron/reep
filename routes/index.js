var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/library', function(req, res, next) {
  res.render('library', { title: 'Library' });
});

module.exports = router;
