/*jshint node:true*/
var _ = require('lodash');
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
        "available": false,
        "available-date": randomDate(new Date(2012, 1, 1), new Date()),
        "name": `Kamil Ogórek ${id}`,
        "first-name": `Kamil ${id}`,
        "last-name": `Ogórek ${id}`,
        "created-at": new Date(),
        "updated-at": new Date(),
        "profile-url": "https://github.com/kamilogorek/",
        "image-url": "https://avatars2.githubusercontent.com/u/1523305?v=3&s=460",
        "address": _.sample(countrySample),
        "location": "39.5500507,-105.7820674",
        "timezone": _.sample(timezoneSample),
        "rate": _.sample(rateSample),
        "skills": _.sample(skillsSample, _.random(1, skillsSample.length))
      }
    };
  })
};

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

randomDate(new Date(2012, 0, 1), new Date())

var rateSample = [25, 30, 50, 100];
var timezoneSample = ['UTC', 'CST', 'CT', 'ECT', 'CEST', 'EAT'];
var skillsSample = ['Javascript', 'React', 'Ember', 'Angular', '.NET', 'Java', 'Ruby', 'Rails', 'Underscore', 'Lodash', 'Backend'];
var countrySample = [
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Congo Brazzaville',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Democratic Republic of the Congo',
  'Denmark',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea'
];
