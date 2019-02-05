import app from "../app";
import { expect } from "chai";
import * as request from "supertest";
import { createExercise, deleteExercise, createBadExercise } from "./common";

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

  it("POST BAD exercise templates", async () => {
    await createBadExercise();
  });

  it("UPDATE exercise templates", async () => {
    await Promise.all(
      exerciseTemplates.map(async (curExercise, i) => {
        const title = `NEW NAME ${i}`;
        const res = await request(app)
          .put(`/api/exercise/${curExercise["_id"]}`)
          .set("Accept", "application/json")
          .send({ title })
          .expect(200);
        expect(JSON.parse(res.text)["title"]).to.equal(title);
      })
    );
  });

  it("UPDATE BAD exercise templates", async () => {
    await Promise.all(
      exerciseTemplates.slice(0,1).map(async (curExercise, i) => {
        const title = `NEW NAME TOOOOOOOOOOOOOO LONG ${i}`;
        try {
          const res = await request(app)
            .put(`/api/exercise/${curExercise["_id"]}`)
            .set("Accept", "application/json")
            .send({ title })
            .expect(500);
        } catch(err) {
          expect(err).to.be.an('error');
        }
      })
    );
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
