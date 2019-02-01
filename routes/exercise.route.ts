import * as express from "express";
import {
  createExercise,
  readExercise,
  readAllExercise,
  deleteExercise,
  softDeleteExercise,
  updateExercise
} from "../controllers/exercises.controller";

import { generateResponseFunc, InputType } from "./common";

let router = express.Router();

/* GET users listing. */
router
  .get("/health-check", (req, res, next) => res.send("OK"))
  // create
  .post("/", generateResponseFunc(InputType.BODY, createExercise))
  // read
  .get("/:id", generateResponseFunc(InputType.ID, readExercise))
  // readall
  .get("/", generateResponseFunc(InputType.NONE, readAllExercise))
  // update
  .put("/:id", generateResponseFunc(InputType.ID_BODY, updateExercise))
  // delete
  .delete("/:id", generateResponseFunc(InputType.ID, deleteExercise))
  // soft delete
  .delete("/soft/:id", generateResponseFunc(InputType.ID, softDeleteExercise));

export default router;
