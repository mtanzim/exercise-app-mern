import * as assert from "assert";
import { expect } from "chai";
import * as request from "supertest";
import app from "../app";
import { createActualExercise, createBadActual, createExercise, deleteActualExercise, deleteExercise } from "./common";


const actualSpec = function() {
  let exerciseTemplates: object[];
  // let cardioIds: string[];
  // let strengthIds: string[];
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
    allIds = await createActualExercise(exerciseTemplates);
  });
  it("POST actual BAD exercises", async () => {
    await createBadActual(exerciseTemplates);
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

  it("UPDATE actual BAD exercises", async () => {
    await createBadActual(exerciseTemplates, true, allIds);
  });

  it("Delete actual exercises", async () => {
    await deleteActualExercise(allIds);
  });

  it("DELETE exercise templates", async () => {
    await deleteExercise(exerciseTemplates);
  });
};

export default actualSpec;
