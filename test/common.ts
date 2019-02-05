import { expect } from "chai";
import * as request from "supertest";
import app from "../app";
import { CARDIO, STRENGTH } from "../models/common";

const defaultExercise = require("./defaultData/exercise.default");
const defaultBadExercise: object[] = require("./defaultData/exercise.default.bad");
const actualExercise = require("./defaultData/actual.default.json");

export const createBadExercise = async (isPut = false) => {
  await Promise.all(
    defaultBadExercise.map(async curBadExercise => {
      try {
        await request(app)
          .post(`/api/exercise/`)
          .set("Accept", "application/json")
          .send([curBadExercise])
          .expect(500);
      } catch (err) {
        expect(err).to.be.an("error");
      }
    })
  );
};

export const createExercise = async () => {
  const res = await request(app)
    .post(`/api/exercise/`)
    .set("Accept", "application/json")
    .send(defaultExercise)
    .expect(200);

  const resData = JSON.parse(res.text);
  return resData.map(elem => ({
    _id: elem._id,
    type: elem.type
  }));
};

export const deleteExercise = async exerciseTemplates => {
  expect(exerciseTemplates).to.have.lengthOf.above(0);
  await Promise.all(
    exerciseTemplates.map(exercise => {
      return request(app)
        .delete(`/api/exercise/${exercise["_id"]}`)
        .set("Accept", "application/json")
        .expect(200)
        .then(res => {
          let resData = JSON.parse(res.text);
          expect(resData._id).to.equal(exercise["_id"]);
        });
    })
  );
};

export const createBadActual = async (
  exerciseTemplates,
  isPut = false,
  actualIds = []
) => {
  let badBodies = [];

  exerciseTemplates.forEach(function(template) {
    badBodies = actualExercise
      .filter(item => item.timedSets !== undefined)
      .map(elem => ({
        ...elem,
        weightedSets: [
          {
            weightUnit: "bad"
          }
        ],
        timeddSets: [
          {
            timeUnit: "bad"
          }
        ],
        hostExercise: template["_id"]
      }));
  });

  try {
    if (isPut) {
      await Promise.all(
        actualIds.map(async id => {
          try {
            await request(app)
              .put(`/api/actual/${id}`)
              .set("Accept", "application/json")
              .send(badBodies[0])
              .expect(500);
          } catch (err) {
            expect(err).to.be.an("error");
          }
        })
      );
    } else {
      await request(app)
        .post(`/api/actual/`)
        .set("Accept", "application/json")
        .send(badBodies)
        .expect(500);
    }
  } catch (err) {
    expect(err).to.be.an("error");
  }
};

export const createActualExercise = async exerciseTemplates => {
  let cardioBodies = [];
  let strengthBodies = [];
  let allBodies = [];
  let cardioIds: string[];
  let strengthIds: string[];

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

  return strengthIds.concat(cardioIds);
};

export const deleteActualExercise = async allIds => {
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
};
