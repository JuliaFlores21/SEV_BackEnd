
module.exports = app => {
    const instrument = require("../controllers/instrument.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Instrument
    router.post("/", [], instrument.create);

    // Retrieve all Instrument
    router.get("/", [], instrument.findAll);

    // Retrieve a single Instrument with id
    router.get("/:id", [], instrument.findOne);

    // Update a Instrument with id
    router.put("/:id", [], instrument.update);

    // Delete a Instrument with id
    router.delete("/:id", [], instrument.delete);

    // Delete all Instrument
    // router.delete("/:id", [], instrument.deleteAll);

    app.use('/performance-t4/instrument', router); 
};