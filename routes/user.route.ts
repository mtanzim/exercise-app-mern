import * as express from "express";
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  return res.send("respond with a resource");
});

export default router;
