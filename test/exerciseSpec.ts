import app from "../app";
import * as fs from "fs";
import { expect } from "chai";
// const expect = require("chai").expect;
import * as request from "supertest";
import { createExercise, deleteExercise } from "./common";

const exerciseSpec = function() {
  let exerciseTemplates: object[] = [];

  it("GETS health check", async () => {
    const res = await request(app)
      .get(`/api/exercise/health-check`)
      .set("Accept", "application/json")
      .expect(200);
  });

  it("POST exercise templates", async () => {
    exerciseTemplates = await createExercise();
  });

  it("READ exercise templates", async () => {
    const res = await request(app)
      .get(`/api/exercise/`)
      .set("Accept", "application/json")
      .expect(200);
    let resData = JSON.parse(res.text);
    let checkIds = exerciseTemplates.map(item => {
      return resData.find(resItem => resItem._id === item["_id"]);
    });
    expect(checkIds.length).to.equal(exerciseTemplates.length);
  });

  it("READ One exercise template", async () => {
    expect(exerciseTemplates).to.have.lengthOf.above(0);
    const res = await request(app)
      .get(`/api/exercise/${exerciseTemplates[0]["_id"]}`)
      .set("Accept", "application/json")
      .expect(200);
    let resData = JSON.parse(res.text);
    expect(resData._id).to.equal(exerciseTemplates[0]["_id"]);
  });

  it("SOFT DELETE exercise templates", async () => {
    await Promise.all(
      exerciseTemplates.map(exercise => {
        return request(app)
          .delete(`/api/exercise/soft/${exercise["_id"]}`)
          .set("Accept", "application/json")
          .expect(200)
          .then(res => {
            let resData = JSON.parse(res.text);
            expect(resData._id).to.equal(exercise["_id"]);
            expect(resData["deleted"]).to.equal(true);
          });
      })
    );
  });

  it("DELETE exercise templates", async () => {
    await deleteExercise(exerciseTemplates);
  });
};

export default exerciseSpec;
