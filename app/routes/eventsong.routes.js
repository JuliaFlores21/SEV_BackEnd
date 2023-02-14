
module.exports = app => {
    const eventsongs = require("../controllers/eventsong.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Event Song for a Tutorial
    router.post("/:WIP/eventsongs/", [authenticate], eventsongs.create);

    // Retrieve all Event Songsfor a Tutorial
    router.get("/:WIP/eventsongs/", [authenticate], eventsongs.findAllForTutorial);

    // Retrieve all published Event Songs for a Tutorial
    router.get("/:WIP/eventsongs/published", [authenticate], eventsongs.findAllPublished);

    // Retrieve a single Event Songs with id
    router.get("/:WIP/eventsongs/:id", [authenticate], eventsongs.findOne);

    // Update a Event Song with id
    router.put("/:WIP/eventsongs/:id", [authenticate], eventsongs.update);

    // Delete a Event Song with id
    router.delete("/:WIP/eventsongs/:id", [authenticate], eventsongs.delete);

    // Delete all Event Songs
    router.delete("/:WIP/eventsongs/:id", [authenticate], eventsongs.deleteAll);

    app.use('/WIP/eventsongs', router); 
};