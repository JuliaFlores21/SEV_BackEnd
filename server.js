require('dotenv').config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");

db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.options('*', cors())

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/availability.routes")(app);
require("./app/routes/composer.routes")(app);
require("./app/routes/critique.routes")(app);
require("./app/routes/event.routes")(app);
require("./app/routes/eventsession.routes")(app);
require("./app/routes/instrument.routes")(app);
require("./app/routes/instrumentrole.routes")(app);
require("./app/routes/repertoireSong.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/song.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3024;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;