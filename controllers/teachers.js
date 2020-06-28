const { Validator } = require('node-input-validator');
const fs = require('fs');
const utils = require('./utils');

class TeachersController {

    create(req, res) {
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
        
          res.redirect(`/professor/`);
    }

    update(req, res) {
        const v = new Validator(req.body, {
            img_url:'required|url',
            nome:   'required|string',
            nasc:   'required|date',
            escolaridade: 'required|between:1,4',
            tipo: 'required|in:À distância,Presencial',
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
            id,
          } = req.body;
        
          const data = fs.readFileSync('./data/professors.json');
          let profArray = JSON.parse(data);
        
          const professor = {
            img_url,
            nome,
            nasc,
            escolaridade,
            tipo,
            area,
            dateCriacaoForm: profArray[id].dateCriacaoForm,
          };
        
        
          profArray[id] = professor;
        
          const jsonString = JSON.stringify(profArray);
        
          fs.writeFileSync('./data/professors.json', jsonString);
        
          res.redirect(`/professor/${id}`);
    }

    remove(req, res) {
        const {id} = req.params;

        const data = fs.readFileSync('./data/professors.json');
        const profArray = JSON.parse(data);

        const filteredProfArray = profArray.filter((prof, index) => {
            if (index != id) return prof
        });

        const jsonString = JSON.stringify(filteredProfArray);

        fs.writeFileSync('./data/professors.json', jsonString);

        res.redirect(`/professor/`);
    }

    show(req, res) {
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

        res.render('card.njk', serialProf);
    }

    index(req, res) {
        const data = fs.readFileSync('./data/professors.json');
        const profArray = JSON.parse(data);

        const serialProfArray = profArray.map((prof, index) => {
            return {
            id: index,
            nome: prof.nome,
            acompanhamento: prof.area.split(',').map(elem => elem.trim()),
            img_url: prof.img_url,
            }
            
        });

        res.render('listar.njk', {data: serialProfArray});

    }

}

module.exports = TeachersController;