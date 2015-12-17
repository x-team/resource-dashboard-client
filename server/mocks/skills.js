/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var skillsRouter = express.Router();

  skillsRouter.get('/', function(req, res) {
    res.send({
      data: [1, 2, 3, 4, 5].map((id) => {
        return {
          "type": "skill",
          "id": `${id}`,
          "attributes": {
            "name": "JavaScript",
            "tags": ["JavaScript", "JS", "Java"]
          }
        };
      })
    });
  });

  skillsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  skillsRouter.get('/:id', function(req, res) {
    res.send({
      'skills': {
        id: req.params.id
      }
    });
  });

  skillsRouter.put('/:id', function(req, res) {
    res.send({
      'skills': {
        id: req.params.id
      }
    });
  });

  skillsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/skills', require('body-parser'));
  app.use('/api/skills', skillsRouter);
};
