import app from "../app";
import { expect } from "chai";
import * as request from "supertest";
import * as assert from "assert";

import { CARDIO, STRENGTH} from "../models/common";
import { createExercise, deleteExercise } from "./common";

const actualExercise = require("./defaultData/actual.default.json");

const actualSpec = function() {
  let exerciseTemplates: object[];
  let cardioIds: string[];
  let strengthIds: string[];
  let allIds: string[];

  it("POST exercise templates", async () => {
    exerciseTemplates = await createExercise();
  });

  it("Checks exercise ids exist", function(done) {
    try {
      assert(exerciseTemplates.length > 0);
    } catch (err) {
      return done(err);
    }
    return done();
  });

  it("POST actual exercises", async () => {
    let cardioBodies = [];
    let strengthBodies = [];
    let allBodies = [];

    exerciseTemplates.forEach(function(template) {
      if (template["type"] === CARDIO) {
        cardioBodies = actualExercise.filter(
          item => item.timedSets !== undefined
        );
        cardioBodies = cardioBodies.map(elem => ({
          ...elem,
          hostExercise: template["_id"]
        }));
      } else if (template["type"] === STRENGTH) {
        strengthBodies = actualExercise.filter(
          item => item.weightedSets !== undefined
        );
        strengthBodies = strengthBodies.map(elem => ({
          ...elem,
          hostExercise: template["_id"]
        }));
      }
    });

    allBodies = cardioBodies.concat(strengthBodies);
    const res = await request(app)
      .post(`/api/actual/`)
      .set("Accept", "application/json")
      .send(allBodies)
      .expect(200);

    const result = JSON.parse(res.text);
    expect(result).to.have.lengthOf(allBodies.length);
    cardioIds = result
      .filter(item => item.timedSets.length === 0)
      .map(item => item["_id"]);
    strengthIds = result
      .filter(item => item.weightedSets.length === 0)
      .map(item => item["_id"]);
    allIds = strengthIds.concat(cardioIds);
  });

  it("GET actual exercises", async () => {
    await Promise.all(
      allIds.map(id => {
        return request(app)
          .get(`/api/actual/${id}`)
          .set("Accept", "application/json")
          .expect(200)
          .then(res => {
            const result = JSON.parse(res.text);
            expect(result["_id"]).to.equal(id);
          });
      })
    );
  });

  it("UPDATE actual exercises", async () => {
    const update = {
      note: "updated from MOCHA!"
    };
    await Promise.all(
      allIds.map(id => {
        return request(app)
          .put(`/api/actual/${id}`)
          .set("Accept", "application/json")
          .send(update)
          .expect(200)
          .then(res => {
            const result = JSON.parse(res.text);
            expect(result["_id"]).to.equal(id);
            expect(result["note"]).to.equal(update["note"]);
          });
      })
    );
  });

  it("Delete actual exercises", async () => {
    await Promise.all(
      allIds.map(id => {
        return request(app)
          .delete(`/api/actual/${id}`)
          .set("Accept", "application/json")
          .send()
          .expect(200)
          .then(res => {
            const result = JSON.parse(res.text);
            expect(result["_id"]).to.equal(id);
          });
      })
    );
  });

  it("DELETE exercise templates", async () => {
    await deleteExercise(exerciseTemplates);
  });
};

export default actualSpec;
