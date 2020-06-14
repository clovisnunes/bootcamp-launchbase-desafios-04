var express = require('express');
var nunjucks = require('nunjucks')
var router = express.Router();

nunjucks.configure('views', { autoescape: true });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout.njk');
});

module.exports = router;
