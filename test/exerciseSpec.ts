import app from "../app";
import * as fs from "fs";
import { expect as chai } from "chai";
// const expect = require("chai").expect;
import * as request from "supertest";

const defaultExercise = require("./defaultData/exercise.default");
const defaultCardioExercise = require("./defaultData/exercise.cardio.json");
const defaultStrengthExercise = require("./defaultData/exercise.strength.json");

const exerciseSpec = function() {
  let exerciseTemplates = [];

  it("GETS health check", function(done) {
    request(app)
      .get(`/api/exercise/health-check`)
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(new Error(res.text));
        return done();
      });
  });
  it("POST exercise templates", function(done) {
    request(app)
      .post(`/api/exercise/`)
      .set("Accept", "application/json")
      .send(defaultExercise)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(new Error(res.text));
        let resData = JSON.parse(res.text);
        exerciseTemplates = resData.map(elem => {
          return {
            _id: elem._id,
            type: elem.type
          };
        });
        // console.log(exerciseTemplates);
        fs.writeFile(
          "test/createdData/exerciseIds.json",
          JSON.stringify(exerciseTemplates, null, 2),
          (err) => {
            if (err) return done(err);
            console.log('Wrote IDs')
            return done()
          }
        );
      });
  });

};

export default exerciseSpec;
