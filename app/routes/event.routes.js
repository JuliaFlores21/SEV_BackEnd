
module.exports = app => {
    const event = require("../controllers/event.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Event
    router.post("/", [authenticate], event.create);

    // Retrieve all events 
    router.get("/", [authenticate], event.findAll);

    // Retrieve a single Event with id
    router.get("/:id", [authenticate], event.findOne);

    // Update a Event with id
    router.put("/:id", [authenticate], event.update);

    // Delete a Event with id
    router.delete("/:id", [authenticate], event.delete);

    // Delete all Events
    //router.delete("/:id", [authenticate], event.deleteAll);

    app.use('/event', router);
};