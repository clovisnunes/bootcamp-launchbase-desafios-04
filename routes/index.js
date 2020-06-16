var express = require('express');
var nunjucks = require('nunjucks')
var router = express.Router();
const fs = require('fs');
const utils = require('../controllers/utils');

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

  const dateCriacao = new Date();
  const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: 'numeric' }) 
  const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(dateCriacao ) 

  const dateCriacaoForm = `${day}/${month}/${year }`; 

  const professor = {
    img_url,
    nome,
    nasc,
    escolaridade,
    tipo,
    area,
    dateCriacaoForm,
  };

  
  const data = fs.readFileSync('./data/professors.json');
  const profArray = JSON.parse(data);

  profArray.push(professor);

  const jsonString = JSON.stringify(profArray);

  fs.writeFileSync('./data/professors.json', jsonString);

  res.send('Cadastrado');
});

router.get('/professor/:id', function(req, res) {
  const {id} = req.params;

  const data = fs.readFileSync('./data/professors.json');
  const profArray = JSON.parse(data);

  if(id > profArray.length - 1) {
    res.sendStatus(404);
  }

  const prof = profArray[id];

  const serialProf = {
    acompanhamento: prof.area.split(',').map(elem => elem.trim()),
    idade: utils.age(prof.nasc),
    graduacao: utils.graduation(prof.escolaridade),
    ...prof,
  }

  res.render('card.njk', serialProf);
});

module.exports = router;
