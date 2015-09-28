/*jshint node:true*/
'use strict';
var express = require('express');
var userTestId = "55eff9a4f835d9b85836c59d";
var workoutID = "55eff12af835d9b85836c590";
var router = express.Router();
var notfound_1 = require('./utils/notfound'); // use latest TS 1.5, inspired from ES6
//import four0four = require('./utils/404');
var data = require('./data');
router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.get('/cobject/v1/users/' + userTestId, getWorker);
router.get('/cobject/v1/seance/' + workoutID, getWorkout);
router.get('/cobject/v1/workoutrecord', getLastRecord);
router.get('/*', notfound_1.notFoundMiddleware);
module.exports = router;
//////////////
//EG TODO: find type for next argument
function getPeople(req, res, next) {
    res.status(200).send(data.getPeople());
}
function getPerson(req, res, next) {
    var id = +req.params.id;
    var person = data.getPeople().filter(function (p) {
        return p.id === id;
    })[0];
    if (person) {
        res.status(200).send(person);
    }
    else {
        notfound_1.send404(req, res, 'person ' + id + ' not found');
    }
}
function getWorker(req, res, next) {
    res.status(200).send(data.getWorker());
}
function getWorkout(req, res, next) {
    res.status(200).send(data.getWorkout());
}
function getLastRecord(req, res, next) {
    res.status(200).send(data.getLastRecord());
}
//# sourceMappingURL=routes.js.map