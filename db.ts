import * as mongoose from "mongoose";
import * as util from "util";

export default cb => {
  mongoose
    .connect(
      process.env.MONGO_URI_LOC + process.env.MONGO_DB_NAME,
      {
        useNewUrlParser: true
      }
    )
    .then(
      () => {
        util.log(`Connected to Mongo on ${process.env.MONGO_URI_LOC}`);
        cb();
      },
      err => {
        util.log(err);
      }
    );
};
