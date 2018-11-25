import express from 'express';
import userRoutes from './user/user.route';

module.exports = function () {

  const router = express.Router();

  router
    .get('/health-check', (req, res, next) => res.send('OK!'))
    .use('/users', userRoutes)

  return router;
}