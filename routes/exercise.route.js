import express from 'express';
import {createExercise} from '../controllers/exercises.controller';

let router = express.Router();

/* GET users listing. */
router
  .get('/health-check', (req,res,next) => res.send('OK'))
  .post('/', function (req, res, next) {
    createExercise(req.body)
      .then(result => res.json(result) )
      .catch(err => next(err))
  });

export default router;
