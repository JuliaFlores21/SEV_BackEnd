
module.exports = app => {
    const instrument = require("../controllers/instrument.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Instrument
    router.post("/", [authenticate], instrument.create);

    // Retrieve all Instrument
    router.get("/", [authenticate], instrument.findAll);

    // Retrieve a single Instrument with id
    router.get("/:id", [authenticate], instrument.findOne);

    // Update a Instrument with id
    router.put("/:id", [authenticate], instrument.update);

    // Delete a Instrument with id
    router.delete("/:id", [authenticate], instrument.delete);

    // Delete all Instrument
    // router.delete("/:id", [authenticate], instrument.deleteAll);

    app.use('/performance-t4/instrument', router); 
};