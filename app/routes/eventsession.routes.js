
module.exports = app => {
    const eventsessions = require("../controllers/eventsession.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Event Sesion
    router.post("/", [authenticate], eventsessions.create);

    // Retrieve all event sessions 
    router.get("/", [authenticate], eventsessions.findAll);

    // Retrieve all Event Sessions for User
    router.get("/user/:userId", [authenticate], eventsessions.findAllForRole);

       // Retrieve all Event Sessions for Event
    router.get("/events/:eventId", [authenticate], eventsessions.findAllForEvent);

    // Retrieve a single Event session with id
    router.get("/:id", [authenticate], eventsessions.findOne);

    // Update a Event Session with id
    router.put("/:id", [authenticate], eventsessions.update);

    // Delete a Event Session with id
    router.delete("/:id", [authenticate], eventsessions.delete);

    // Delete all Event Sessions
    // router.delete("/:id", [authenticate], eventsessions.deleteAll);

    app.use('/performance-t4/eventsessions', router);
};