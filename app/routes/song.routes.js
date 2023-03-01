
module.exports = app => {
    const song = require("../controllers/song.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new songs
    router.post("/", [authenticate], song.create);

    // Retrieve all songs
    router.get("/", [authenticate], song.findAll);

    // Retrieve all songs for students
    router.get("/", [authenticate], song.findAllForStudent); //how to do it?

    // Retrieve a song id
    router.get("/:id", [authenticate], song.findOne);

    // Update a song with id
    router.put("/:id", [authenticate], song.update);

    // Delete a song with id
    router.delete("/:id", [authenticate], song.delete);

    // Delete all song
   // router.delete("/:id", [authenticate], song.deleteAll);

    app.use('/performance-t4/song', router); 
};