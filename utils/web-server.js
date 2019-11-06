const http = require("http");
const express = require("express");
const webServerConfig = require("../config/web-server.js");
const router = require("../rest/router");
const cors = require("cors");
const bodyParser = require("body-parser");

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);

    // Mount the router at /api so all its routes start with /api
    app.use(cors());
    app.options("*", cors());
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    app.use("/api", router);
    // Parse incoming JSON requests and revive JSON.

    httpServer
      .listen(webServerConfig.port)
      .on("listening", () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);

        resolve();
      })
      .on("error", err => {
        reject(err);
      });
  });
}

module.exports.initialize = initialize;

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close(err => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;
