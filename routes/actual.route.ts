import * as express from "express";
import { createActuals } from "../controllers/actual.controller";

import { generateResponseFunc, InputType } from "./responseHelpers";

let router = express.Router();

router
  .get("/health-check", (req, res, next) => res.send("OK"))
  // create
  .post(`/`, generateResponseFunc(InputType.BODY, createActuals))
  // read
  // readAll
  // readAllByParent
  // update
  // delete

export default router;

