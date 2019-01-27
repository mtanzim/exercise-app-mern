import app from "../app";
import { expect } from "chai";
// const expect = require("chai").expect;
import * as request from "supertest";
import * as assert from "assert";

import { CARDIO, S, STRENGTH, KG, LBS } from "../models/common";

const actualExercise = require("./defaultData/actual.default.json");
const exerciseTemplates = require("./createdData/exerciseIds.json");

// actual exercises need to be redesigned
const actualSpec = function() {
  // this.timeout(10000);

  let cardioIds: string[];
  let strengthIds: string[];
  let allIds: string[];

  it("Checks exercise ids exist", function(done) {
    try {
      assert(exerciseTemplates.length > 0);
    } catch (err) {
      return done(err);
    }
    return done();
  });

  it("POST actual exercises", function(done) {
    let cardioBodies = [];
    let strengthBodies = [];
    let allBodies = [];

    exerciseTemplates.forEach(function(template) {
      if (template.type === CARDIO) {
        cardioBodies = actualExercise.filter(
          item => item.timedSets !== undefined
        );
        cardioBodies = cardioBodies.map(elem => ({
          ...elem,
          hostExercise: template._id
        }));
      } else if (template.type === STRENGTH) {
        strengthBodies = actualExercise.filter(
          item => item.weightedSets !== undefined
        );
        strengthBodies = strengthBodies.map(elem => ({
          ...elem,
          hostExercise: template._id
        }));
      }
    });

    allBodies = cardioBodies.concat(strengthBodies);
    request(app)
      .post(`/api/actual/`)
      .set("Accept", "application/json")
      .send(allBodies)
      .expect(200)
      .then(res => {
        // console.log(res.text);
        const result = JSON.parse(res.text);
        expect(result).to.have.lengthOf(allBodies.length);
        cardioIds = result
          .filter(item => item.timedSets.length === 0)
          .map(item => item._id);
        strengthIds = result
          .filter(item => item.weightedSets.length === 0)
          .map(item => item._id);

        allIds = strengthIds.concat(cardioIds);
        // console.log('done');
        return done();
      });
  });

  it("GET actual exercises", function(done) {
    Promise.all(allIds.map(id => {
      return request(app)
      .get(`/api/actual/${id}`)
      .set("Accept", "application/json")
      .send()
      .expect(200)
      .then(res => {
        const result = JSON.parse(res.text);
        // console.log(result);
        expect(result._id).to.equal(id);
      })
    }))
    .then (res => {
      done();
    })
  });

  it("Delete actual exercises", function(done) {
    Promise.all(allIds.map(id => {
      return request(app)
      .delete(`/api/actual/${id}`)
      .set("Accept", "application/json")
      .send()
      .expect(200)
      .then(res => {
        const result = JSON.parse(res.text);
        expect(result._id).to.equal(id);
      })
    }))
    .then (res => {
      done();
    })
  });


};

export default actualSpec;
