require('dotenv').load();
const connectMongoose = require('./helpers/connectMongoose');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
// const app = App();

const defaultExercise = require('./defaultData/exercise.default')

describe("API Mongoose", function () {

  this.timeout(4000);
  before(function (done) {
    connectMongoose()
      .then(() => done())
  });



  describe("API.exercise", function () {

    let exerciseTemplates = [];

    it("GETS health check", function (done) {
      request(app)
        .get(`/api/exercise/health-check`)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function ( err, res) {
          if (err) return done(new Error(res.text));
          return done();
        });
    });
    it("POST exercise templates", function (done) {
      request(app)
        .post(`/api/exercise/`)
        .set('Accept', 'application/json')
        .send(defaultExercise)
        .expect(200)
        .end(function ( err, res) {
          let resData = JSON.parse(res.text);
          exerciseTemplates = resData.map(elem => {
            return {
              _id:elem._id,
              type:elem.type
            }
          })
          // console.log(exerciseTemplates);
          if (err) return done(new Error(res.text));
          return done();
        });
    });
  });


});