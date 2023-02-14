
module.exports = app => {
    const eventsessions = require("../controllers/eventsession.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Event Sesion
    router.post("/", [authenticate], eventsessions.create);

    // Retrieve all published Event Sessions
    router.get("/", [authenticate], eventsessions.findAllForEvent); //how to do it?

    // Retrieve a single Event session with id
    router.get("/:id", [authenticate], eventsessions.findOne);

    // Update a Event Session with id
    router.put("/:id", [authenticate], eventsessions.update);

    // Delete a Event Session with id
    router.delete("/:id", [authenticate], eventsessions.delete);

    // Delete all Event Sessions
    // router.delete("/:id", [authenticate], eventsessions.deleteAll);

    app.use('/eventsessions', router);
};