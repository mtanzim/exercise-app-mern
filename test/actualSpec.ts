import app from "../app";
import { expect } from "chai";
// const expect = require("chai").expect;
import * as request from "supertest";
import * as assert from "assert"

import {CARDIO,
  S,
  STRENGTH,
  KG,
  LBS} from "../models/common"

// const defaultExercise = require("./defaultData/exercise.default");
// const defaultCardioExercise = require("./defaultData/exercise.cardio.json");
// const defaultStrengthExercise = require("./defaultData/exercise.strength.json");
const actualExercise = require("./defaultData/actual.default.json");
const exerciseTemplates = require("./createdData/exerciseIds.json")


// actual exercises need to be redesigned
const actualSpec = function() {
  
  it("Checks valid exercise ids", function(done) {
    
    try {
      assert(exerciseTemplates.length > 0)
    } catch (err) {
      return done(err);
    }
    return done()
  });
    
  it("POST actual exercises", function(done) {

        let cardioBodies=[];
        let strengthBodies=[];

        exerciseTemplates.forEach(function(template) {
          // console.log(template)
          if (template.type === CARDIO) {
            cardioBodies = actualExercise.filter(item => item.timedSets !== undefined)
            cardioBodies = cardioBodies.map(elem => ({
              ...elem,
              hostExercise: template._id
            }));
          } else if (template.type === STRENGTH) {
            strengthBodies = actualExercise.filter(item => item.weightedSets !== undefined)
            strengthBodies = strengthBodies.map(elem => ({
              ...elem,
              hostExercise: template._id
            }));
          }
        })
        // console.log('S')
        // console.log(strengthBodies);
        // console.log('C')
        // console.log(cardioBodies);
        let allBodies = cardioBodies.concat(strengthBodies)
        // console.log(allBodies)
        request(app)
          .post(`/api/actual/`)
          .set("Accept", "application/json")
          .send(allBodies)
          .expect(200)
          .then(res => {
            console.log(res.text);
            // JSON.parse(res.text).forEach(element => {
            //   expect(element).to.haveOwnProperty("_id");
            //   console.log(res.body)
            //   // return done();
            // });
            return done();
          });

  });
};

export default actualSpec;
