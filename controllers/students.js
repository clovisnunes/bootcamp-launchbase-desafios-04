const { Validator } = require('node-input-validator');
const fs = require('fs');
const utils = require('./utils');

class StudentsController {

    create(req, res) {
        const v = new Validator(req.body, {
            img_url:'required|url',
            nome:   'required|string',
            email:   'required|email',
            nasc:   'required|date',
            escolaridade: 'required|between:1,8',
            carga: 'required|number',
          });
        
          v.check().then((matched) => {
            if (!matched) {
              res.status(422).send(v.errors);
            }
          });
        
          const {
            img_url,
            nome,
            email,
            nasc,
            escolaridade,
            carga,
          } = req.body;
        
          const student = {
            img_url,
            nome,
            email,
            nasc,
            escolaridade,
            carga,
          };
        
          
          const data = fs.readFileSync('./data/students.json');
          const profArray = JSON.parse(data);
        
          profArray.push(student);
        
          const jsonString = JSON.stringify(profArray);
        
          fs.writeFileSync('./data/students.json', jsonString);
        
          res.redirect(`/student/`);
    }

    update(req, res) {
        const v = new Validator(req.body, {
          img_url:'required|url',
          nome:   'required|string',
          email:   'required|email',
          nasc:   'required|date',
          escolaridade: 'required|between:1,8',
          carga: 'required|number',
        });
        
          v.check().then((matched) => {
            if (!matched) {
              res.status(422).send(v.errors);
            }
          });
        
          const {
            img_url,
            nome,
            email,
            nasc,
            escolaridade,
            carga,
            id,
          } = req.body;
        
          const data = fs.readFileSync('./data/students.json');
          let profArray = JSON.parse(data);
        
          const student = {
            img_url,
            nome,
            email,
            nasc,
            escolaridade,
            carga,
          };
        
        
          profArray[id] = student;
        
          const jsonString = JSON.stringify(profArray);
        
          fs.writeFileSync('./data/students.json', jsonString);
        
          res.redirect(`/student/${id}`);
    }

    remove(req, res) {
        const {id} = req.params;

        const data = fs.readFileSync('./data/students.json');
        const profArray = JSON.parse(data);

        const filteredProfArray = profArray.filter((prof, index) => {
            if (index != id) return prof
        });

        const jsonString = JSON.stringify(filteredProfArray);

        fs.writeFileSync('./data/students.json', jsonString);

        res.redirect(`/student/`);
    }

    show(req, res) {
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

        res.render('./students/card.njk', serialProf);
    }

    index(req, res) {
        const data = fs.readFileSync('./data/students.json');
        const profArray = JSON.parse(data);

        const serialProfArray = profArray.map((prof, index) => {
            return {
              id: index,
              img_url: prof.img_url,
              nome: prof.nome,
              email: prof.email,
              escolaridade: utils.grade(prof.escolaridade),
            }
            
        });

        res.render('./students/listar.njk', {data: serialProfArray});
    }

}

module.exports = StudentsController;