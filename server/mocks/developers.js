/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var developersRouter = express.Router();

  developersRouter.get('/', function(req, res) {
    res.send({
      data: [1, 2, 3, 4, 5].map((id) => {
        return {
          "type": "developer",
          "id": `${id}`,
          "attributes": {
            "name": "Kamil Ogórek",
            "first-name": "Kamil",
            "last-name": "Ogórek",
            "created-at": new Date(),
            "updated-at": new Date(),
            "profile-url": "https://github.com/kamilogorek/",
            "image-url": "https://avatars2.githubusercontent.com/u/1523305?v=3&s=460",
            "skills": ["JavaScript", "Node.js"],
            "location": "Kraków, PL",
            "timezone": "Europe/Warsaw",
            "rate": 128,
            "next-available": new Date()
          }
        };
      })
    });
  });

  developersRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  developersRouter.get('/:id', function(req, res) {
    res.send({
      'developers': {
        id: req.params.id
      }
    });
  });

  developersRouter.put('/:id', function(req, res) {
    res.send({
      'developers': {
        id: req.params.id
      }
    });
  });

  developersRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/developers', require('body-parser'));
  app.use('/api/developers', developersRouter);
};
