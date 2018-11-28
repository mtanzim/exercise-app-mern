import express from 'express';
import {createExercise, createActualExercise, getAllExercises} from '../controllers/exercises.controller';
import {STRENGTH, CARDIO} from '../models/common';

let router = express.Router();

/* GET users listing. */
router
  .get('/health-check', (req,res,next) => res.send('OK'))
  .get('/', function (req, res, next) {
    getAllExercises()
      .then(result => res.json(result))
      .catch(err => next(err));
  })
  .post('/', function (req, res, next) {
    createExercise(req.body)
      .then(result => res.json(result) )
      .catch(err => next(err));
  })
  .post(`/${CARDIO}`, function (req, res, next) {
    createActualExercise(CARDIO, req.body)
      .then(result => res.json(result))
      .catch(err => next(err));
  })
  .post(`/${STRENGTH}`, function (req, res, next) {
    createActualExercise(STRENGTH, req.body)
      .then(result => res.json(result))
      .catch(err => next(err));
  });

export default router;
