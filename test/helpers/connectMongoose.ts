const mongoose = require("mongoose");
const util = require("util");

module.exports = function() {
  mongoose.Promise = global.Promise;
  return mongoose
    .connect(
      process.env.MONGO_URI_LOC,
      {
        useNewUrlParser: true
      }
    )
    .then(
      () => {
        util.log(`Connected to Mongo on ${process.env.MONGO_URI_LOC}`);
      },
      err => {
        util.log(err);
      }
    );
};
