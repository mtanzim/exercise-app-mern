import app from "../app";
import * as fs from "fs";
import { expect } from "chai";
import * as assert from "assert";
import * as request from "supertest";
import {
  createExercise,
  createActualExercise,
  deleteExercise,
  deleteActualExercise
} from "./common";

const defaultJournal: object[] = require("./defaultData/journal.default");

const journalSpec = function() {
  let exerciseTemplates: object[] = [];
  let actualExerciseIds: string[] = [];
  let journalIds: string[] = [];

  it("GETS health check", async () => {
    const res = await request(app)
      .get(`/api/routine/health-check`)
      .set("Accept", "application/json")
      .expect(200);
  });
  it("POST exercise templates", async () => {
    exerciseTemplates = await createExercise();
  });
  it("POST actual exercise templates", async () => {
    actualExerciseIds = await createActualExercise(exerciseTemplates);
  });

  it("POST Journals", async () => {
    const journalToPost = defaultJournal.map(journal => {
      return { ...journal, actualExercises: actualExerciseIds };
    });

    const res = await request(app)
      .post(`/api/journal/`)
      .set("Accept", "application/json")
      .send(journalToPost)
      .expect(200);

    const result = JSON.parse(res.text);
    journalIds = result.map(a => a["_id"]);
    expect(journalIds).to.have.lengthOf(defaultJournal.length);
  });

  it("READ ALL Journals", async () => {
    const res = await request(app)
      .get(`/api/journal/`)
      .set("Accept", "application/json")
      .expect(200);
    const result = JSON.parse(res.text);
    const result_ids = result.map(a => a["_id"]);
    expect(result_ids).to.have.lengthOf(journalIds.length);
  });
  it("READ EACH Journal", async () => {
    await Promise.all(
      journalIds.map(async curId => {
        const res = await request(app)
          .get(`/api/journal/${curId}`)
          .set("Accept", "application/json")
          .expect(200);
        const result = JSON.parse(res.text);
        // console.log(result["_id"]);
        expect(result["_id"]).to.equal(curId);
      })
    );
  });
  it("DELETE EACH Journal", async () => {
    await Promise.all(
      journalIds.map(async curId => {
        const res = await request(app)
          .delete(`/api/journal/${curId}`)
          .set("Accept", "application/json")
          .expect(200);
        const result = JSON.parse(res.text);
        console.log(`Deleted ${result["_id"]}`);
        expect(result["_id"]).to.equal(curId);
      })
    );
  });

  it("Delete actual exercises", async () => {
    await deleteActualExercise(actualExerciseIds);
  });

  it("DELETE exercise templates", async () => {
    await deleteExercise(exerciseTemplates);
  });
};

export default journalSpec;
