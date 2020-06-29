var express = require('express');
var nunjucks = require('nunjucks')
const fs = require('fs');

const utils = require('../controllers/utils');
const TeacherController = require('../controllers/teachers');
const StudentController = require('../controllers/students');

var router = express.Router();
nunjucks.configure('views', { autoescape: true });

const teacherController = new TeacherController();
const studentController = new StudentController();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('layout.njk');
});

/* PROFESSORES */
router.get('/professor/cadastro', function(req, res) {
  res.render('./teachers/form.njk');
});

router.get('/professor/editar/:id', function(req, res) {
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

  res.render('./teachers/editar.njk', serialProf);
});

router.get('/professor/:id', teacherController.show);
router.get('/professor', teacherController.index);

router.post('/professor', teacherController.create);
router.put('/professor/:id', teacherController.update);

router.delete('/professor/:id', teacherController.remove);

/* ESTUDANTES */
router.get('/student/cadastro', function(req, res) {
  res.render('./students/form.njk');
});

router.get('/student/editar/:id', function(req, res) {
  const {id} = req.params;

  const data = fs.readFileSync('./data/students.json');
  const profArray = JSON.parse(data);

  if(id > profArray.length - 1) {
    res.sendStatus(404);
  }

  const prof = profArray[id];

  const serialProf = {
    idade: utils.age(prof.nasc),
    graduacao: utils.grade(prof.escolaridade),
    id,
    ...prof,
  }

  res.render('./students/editar.njk', serialProf);
});

router.get('/student/:id', studentController.show);
router.get('/student', studentController.index);

router.post('/student', studentController.create);
router.put('/student/:id', studentController.update);

router.delete('/student/:id', studentController.remove);

module.exports = router;
