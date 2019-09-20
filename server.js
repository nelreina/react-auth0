require("dotenv").config();
const express = require("@nelreina/node-express");
const http = require("http");
const log4js = require("@nelreina/node-log4js");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const logger = log4js("app");

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  algorithms: ["RS256"]
});
logger.info(
  "REACT_APP_AUTH0_AUDIENCE= " + process.env.REACT_APP_AUTH0_AUDIENCE
);
logger.info("REACT_APP_AUTH0_DOMAIN= " + process.env.REACT_APP_AUTH0_DOMAIN);
const app = express();

app.get("/public", (req, res) => {
  res.json({ message: "Message from public API" });
});
app.get("/private", jwtCheck, (req, res) => {
  res.json({ message: "Message from private API" });
});

const server = http.createServer(app);
server.listen(3002, () => logger.info(`API is running on port 3002`));
