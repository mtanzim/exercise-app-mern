import * as express from "express";
import * as logger from "morgan";
import * as session from "express-session";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as nodeUtil from "util";
import createRouter from "./routes";

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secretExercise",
    resave: false,
    saveUninitialized: true
  })
);

app.use("/api", createRouter());
// catch 404 and forward to error handler
app.use((req, res, next) => {
  let error = new Error("Not found!");
  return next(error);
});

// error handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "dev") {
    nodeUtil.log(err.stack);
    nodeUtil.log(err.message);
    res.status(500).send(err.message);
  } else {
    res.status(500).send("Not Found!");
  }
});

export default app;
