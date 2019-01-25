const dotEnv = require("dotenv").config();
/* if (dotEnv.error) throw dotEnv.error;
console.log(dotEnv.parsed) */
// const connectMongoose = require("./helpers/connectMongoose");

import connectMongoose from "../db";
import exerciseSpec from "./exerciseSpec"
import actualSpec from "./actualSpec"

describe("API Mongoose", function() {
  this.timeout(4000);
  before(function(done) {
    connectMongoose(done);
  });

  describe("API.exercise", exerciseSpec)
  // describe("API.actuals", actualSpec)
});
