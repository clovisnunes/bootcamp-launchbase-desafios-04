var express = require('express');
var nunjucks = require('nunjucks')
var router = express.Router();
const fs = require('fs');

const { Validator } = require('node-input-validator');

nunjucks.configure('views', { autoescape: true });


/* GET home page. */
router.get('/', function(req, res) {
  res.render('layout.njk');
});

router.get('/card', function(req, res) {
  res.render('card.njk');
});

router.get('/cadastro', function(req, res) {
  res.render('form.njk');
});

router.post('/professor', function(req, res, next) {
  const v = new Validator(req.body, {
    img_url:'required|url',
    nome:   'required|string',
    nasc:   'required|date',
    escolaridade: 'required|between:1,4',
    tipo: 'required|in:distancia,presencial',
    area: 'required|string',
  });

  v.check().then((matched) => {
    if (!matched) {
      res.status(422).send(v.errors);
    }
  });

  const {
    img_url,
    nome,
    nasc,
    escolaridade,
    tipo,
    area,
  } = req.body;

  const professor = {
    img_url,
    nome,
    nasc,
    escolaridade,
    tipo,
    area,
  };

  
  const data = fs.readFileSync('./data/professors.json');
  const profArray = JSON.parse(data);

  profArray.push(professor);

  const jsonString = JSON.stringify(profArray);

  fs.writeFileSync('./data/professors.json', jsonString);

  res.send('Cadastrado');
});

module.exports = router;
