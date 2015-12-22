/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var opportunitiesRouter = express.Router();

  opportunitiesRouter.get('/', function(req, res) {
    var page = +req.query.page || 1,
        result = getOpportunities(),
        totalItemsCount = result.length,
        itemsPerPage = 10,
        totalPages = Math.ceil(totalItemsCount / itemsPerPage);

    if(page > totalPages) {
      return res.send(400);
    }

    var start = ((page - 1) * itemsPerPage) + 1;
    var end = start + (itemsPerPage - 1);

    result = result.slice(start - 1, end);

    res.send({
      data: result,
      meta: {totalItemsCount}
    });
  });

  opportunitiesRouter.post('/', function(req, res) {
    res.status(201).end();
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
