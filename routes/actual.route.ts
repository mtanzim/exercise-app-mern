import * as express from "express";
import {
  createActuals,
  readActual,
  updateActual,
  deleteActual
} from "../controllers/actual.controller";

import { generateResponseFunc, InputType } from "./common";

let router = express.Router();

router
  .get("/health-check", (req, res, next) => res.send("OK"))
  // create
  .post(`/`, generateResponseFunc(InputType.BODY, createActuals))
  // read
  .get(`/:id`, generateResponseFunc(InputType.ID, readActual))
  // readAll
  // readAllByParent
  // update
  .put(`/:id`, generateResponseFunc(InputType.ID_BODY, updateActual))
  // delete
  .delete(`/:id`, generateResponseFunc(InputType.ID, deleteActual));


export default router;
