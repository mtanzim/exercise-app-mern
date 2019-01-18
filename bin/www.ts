#!/usr/bin/env node

/**
 * Module dependencies.
 */
require("dotenv").config();

var app = require("../app");
const nodeUtil = require("util");
var debug = require("debug")("exercisetrackerapp:server");
var http = require("http");

import * as mongoose from "mongoose";


// connect to mongoose
// nodeUtil.log(process.env.MONGO_URI_LOC);
let mongoUri;
if (process.env.NODE_ENV === "production") mongoUri = process.env.MONGO_URI;
else mongoUri = process.env.MONGO_URI_LOC + process.env.MONGO_DB_NAME;
// mongoose.Promise = global.Promise;
console.log(mongoUri);
mongoose
  .connect(
    mongoUri,
    {
      useNewUrlParser: true
    }
  )
  .then(
    () => {
      nodeUtil.log(`Connected to Mongo on ${mongoUri}`);
    },
    err => {
      nodeUtil.log(err);
      throw err;
    }
  );

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

process.on('SIGINT', () => { console.log("\nBye bye!"); process.exit(); });

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  nodeUtil.log("Listening on " + bind);
}