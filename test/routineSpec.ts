import app from "../app";
import * as fs from "fs";
import { expect } from "chai";
import * as assert from "assert";
import * as request from "supertest";
import { createExercise, deleteExercise } from "./common";

const defaultRoutine = require("./defaultData/routine.default");


const routineSpec = function() {
  let exerciseTemplates: object[] = [];
  let routineTemplate: object[] = [];

  let routineIds:string [] = []

  it("GETS health check", async () => {
    const res = await request(app)
      .get(`/api/routine/health-check`)
      .set("Accept", "application/json")
      .expect(200);
  });
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
  it("POST routines", async () => {
    const exerciseArr = exerciseTemplates.map(exercise => {
      return {
        "exercise":exercise["_id"],
        "qty": 5,
      }
    })
    const routineTemplates = defaultRoutine.map( routine => {
      return {...routine, "exercises":exerciseArr}
    })

    const res = await request(app)
      .post(`/api/routine/`)
      .set("Accept", "application/json")
      .send(routineTemplates)
      .expect(200);

      const result = JSON.parse(res.text);
      expect(result).to.have.lengthOf(routineTemplates.length);
      routineIds = result.map(item => item["_id"])
      expect(routineIds).to.have.lengthOf(routineTemplates.length)
      console.log(res.text)

  });

  it("READ routines", async () => {

  });
  it("UPDATE routines", async () => {

  });
  it("READ ALL routines", async () => {

  });
  it("DELETE routines", async () => {

  });



  it("DELETE exercise templates", async () => {
    await deleteExercise(exerciseTemplates);
  });
};

export default routineSpec;
