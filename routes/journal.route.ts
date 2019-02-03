import * as express from "express";
import {
  create,
  read,
  readAll,
  update,
  del,
} from "../controllers/journal.controller";

import { generateResponseFunc, InputType } from "./common";

let router = express.Router();

/* GET users listing. */
router
  .get("/health-check", (req, res, next) => res.send("OK from journal"))
  // create
  .post("/", generateResponseFunc(InputType.BODY, create))
  // read
  .get("/:id", generateResponseFunc(InputType.ID, read))
  // readall
  .get("/", generateResponseFunc(InputType.NONE, readAll))
  // update
  .put("/:id", generateResponseFunc(InputType.ID_BODY, update))
  // delete
  .delete("/:id", generateResponseFunc(InputType.ID, del))
  // soft delete

export default router;
