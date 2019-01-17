var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var util = require("util");

const session = require("express-session");

// var indexRouter = require('./routes/index');
var router = require("./routes");

var app = express();

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

app.use("/api", router());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // res.json(err);
  // next(createError(404));
  var error = new Error("Not found!");
  next(error);
});

// error handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "dev") {
    util.log(err.stack);
    util.log(err.message);
    res.status(500).send(err.message);
  } else {
    res.status(500).send("Not Found!");
  }
});
/* app.use(function(err, req, res) {
  console.log('Coming to error handler');
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
}); */

module.exports = app;
