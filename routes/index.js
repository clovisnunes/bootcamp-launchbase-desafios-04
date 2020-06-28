var express = require('express');
var nunjucks = require('nunjucks')
const fs = require('fs');

const utils = require('../controllers/utils');
const TeacherController = require('../controllers/teachers');

var router = express.Router();
nunjucks.configure('views', { autoescape: true });

const teacherController = new TeacherController();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('layout.njk');
});

router.get('/cadastro', function(req, res) {
  res.render('form.njk');
});

router.get('/editar/:id', function(req, res) {
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
    id,
    ...prof,
  }

  res.render('editar.njk', serialProf);
});

router.get('/professor/:id', teacherController.show);
router.get('/professor', teacherController.index);

router.post('/professor', teacherController.create);
router.put('/professor/:id', teacherController.update);

router.delete('/professor/:id', teacherController.remove);



module.exports = router;
