import * as mongoose from "mongoose";
import * as util from "util";

export default async cb => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI_LOC + process.env.MONGO_DB_NAME,
      {
        useNewUrlParser: true
      }
    );
    util.log(`Connected to Mongo on ${process.env.MONGO_URI_LOC}`);
    cb();
  } catch (err) {
    util.log(err);
  }
};
