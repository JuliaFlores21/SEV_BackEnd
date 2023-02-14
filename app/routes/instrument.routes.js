
module.exports = app => {
    const instrument = require("../controllers/instrument.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Event Song for a Tutorial
    router.post("/", [authenticate], instrument.create);

    // Retrieve all Event Songsfor a Tutorial
    router.get("/", [authenticate], instrument.findAllForTutorial);

    // Retrieve a single Event Songs with id
    router.get("/:id", [authenticate], instrument.findOne);

    // Update a Event Song with id
    router.put("/:id", [authenticate], instrument.update);

    // Delete a Event Song with id
    router.delete("/:id", [authenticate], instrument.delete);

    // Delete all Event Songs
    // router.delete("/:id", [authenticate], instrument.deleteAll);

    app.use('/instrument', router); 
};