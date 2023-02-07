
module.exports = app => {
    const events = require("../controllers/event.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Event for a Tutorial
    router.post("/:WIP/events/", [authenticate], events.create);

    // Retrieve all Events for a Tutorial
    router.get("/:WIP/events/", [authenticate], events.findAllForTutorial);

    // Retrieve all published Events for a Tutorial
    router.get("/:WIP/events/published", [authenticate], events.findAllPublished);

    // Retrieve a single Event with id
    router.get("/:WIP/events/:id", [authenticate], events.findOne);

    // Update a Event with id
    router.put("/:WIP/events/:id", [authenticate], events.update);

    // Delete a Event with id
    router.delete("/:WIP/events/:id", [authenticate], events.delete);

    // Delete all Events
    router.delete("/:WIP/events/:id", [authenticate], events.deleteAll);

    app.use('/WIP/WIPS', router);
};