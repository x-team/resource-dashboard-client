/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var opportunitiesRouter = express.Router();

  opportunitiesRouter.get('/', function(req, res) {
    res.send({
      data: getOpportunities()
    });
  });

  opportunitiesRouter.post('/', function(req, res) {
    var newOpportunity = getOpportunities()[0];
    newOpportunity.id = "100"
    res.send(201, {data: newOpportunity});
  });

  opportunitiesRouter.get('/:id', function(req, res) {
    res.send({
      'opportunities': {
        id: req.params.id
      }
    });
  });

  opportunitiesRouter.put('/:id', function(req, res) {
    res.send({
      'opportunities': {
        id: req.params.id
      }
    });
  });

  opportunitiesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/opportunities', require('body-parser'));
  app.use('/api/opportunities', opportunitiesRouter);
};

var getOpportunities = function() {
  //create array from 1..20
  var result = new Array(20).fill().map((x, index) => index + 1);

  return result.map((id) => {
    return {
      "type": "opportunity",
      "id": `${id}`,
      "attributes": {
        "date-from": new Date(),
        "date-to": new Date(),
        "name": `Fox ${id}`,
        "skills": ["JavaScript", "Node.js"]
      }
    };
  })
};
