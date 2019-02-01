const dotEnv = require("dotenv").config();
/* if (dotEnv.error) throw dotEnv.error;
console.log(dotEnv.parsed) */
import * as nodeUtil from "util";
import app from "./app";
import connectMongoose from "./db";

const PORT: number = Number(process.env.PORT) || 3000;

connectMongoose(() => {
  app.listen(PORT, () => nodeUtil.log(`Listening on ${PORT}`));
});
