
module.exports = app => {
    const eventsessions = require("../controllers/eventsession.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Event Sesion for a Tutorial
    router.post("/:WIP/eventsessions/", [authenticate], eventsessions.create);

    // Retrieve all Event Sessions for a Tutorial
    router.get("/:WIP/eventsessions/", [authenticate], eventsessions.findAllForTutorial);

    // Retrieve all published Event Sessions for a Tutorial
    router.get("/:WIP/eventsessions/published", [authenticate], eventsessions.findAllPublished);

    // Retrieve a single Event seesion with id
    router.get("/:WIP/eventsessions/:id", [authenticate], eventsessions.findOne);

    // Update a Event Seesion with id
    router.put("/:WIP/eventsessions/:id", [authenticate], eventsessions.update);

    // Delete a Event Session with id
    router.delete("/:WIP/eventsessions/:id", [authenticate], eventsessions.delete);

    // Delete all Event Sessions
    router.delete("/:WIP/eventsessions/:id", [authenticate], eventsessions.deleteAll);

    app.use('/WIP/WIPS', router);
};