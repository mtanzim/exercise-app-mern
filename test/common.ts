import app from "../app";
import * as fs from "fs";
import { expect } from "chai";
import * as request from "supertest";

const defaultExercise = require("./defaultData/exercise.default");

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
