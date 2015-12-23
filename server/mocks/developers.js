/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var developersRouter = express.Router();

  developersRouter.get('/', function(req, res) {
    res.send({
      data: getDevelopers()
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


var getDevelopers = function() {
  //create array from 1..95
  var result = new Array(95).fill().map((x, index) => index + 1);

  return result.map((id) => {
    return {
      "type": "developer",
      "id": `${id}`,
      "attributes": {
        "available": true,
        "availableDate": new Date(),
        "name": `Kamil Ogórek ${id}`,
        "first-name": `Kamil ${id}`,
        "last-name": `Ogórek ${id}`,
        "created-at": new Date(),
        "updated-at": new Date(),
        "profile-url": "https://github.com/kamilogorek/",
        "image-url": "https://avatars2.githubusercontent.com/u/1523305?v=3&s=460",
        "address": "Kraków, PL",
        "location": "39.5500507,-105.7820674",
        "timezone": "Europe/Warsaw",
        "rate": 128,
        "skills": ["JavaScript", "Node.js"]
      }
    };
  })
};
