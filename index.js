const express = require("express");
const Boom = require("boom");
const glob = require("glob");
const cors = require("cors");
const config = require("./config");

const app = express();

app.use(cors("*"));

const apis = glob.sync(`${config.path}/**/*Api.js`);

apis.forEach(apiPath => {
  require(`${apiPath}`)(app);
});

app.use((err, req, res, next) => {
  const error = Boom.isBoom(err) ? err : Boom.boomify(err);
  res
    .status(error.output.statusCode)
    .json({ message: error.message, error: error.output.payload.error });
});

app.listen(3000);
