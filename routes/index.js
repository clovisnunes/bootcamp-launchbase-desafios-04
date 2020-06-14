var express = require('express');
var nunjucks = require('nunjucks')
var router = express.Router();

nunjucks.configure('views', { autoescape: true });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout.njk');
});

router.get('/card', function(req, res, next) {
  res.render('card.njk');
});

router.get('/cadastro', function(req, res, next) {
  res.render('form.njk');
});

module.exports = router;
