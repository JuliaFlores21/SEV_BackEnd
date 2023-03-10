
module.exports = app => {
    const repertoireSong = require("../controllers/repertoireSong.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new repertoire songs
    router.post("/", [authenticate], repertoireSong.create);

    // Retrieve all repertoire songs
    router.get("/", [authenticate], repertoireSong.findAll);

    // Retrieve all repertoire songs for students
    router.get("/", [authenticate], repertoireSong.findAllForStudent); //how to do it?

    // Retrieve a repertoireSong id
    router.get("/:id", [authenticate], repertoireSong.findOne);

    // Update a repertoireSong with id
    router.put("/:id", [authenticate], repertoireSong.update);

    // Delete a repertoireSong with id
    router.delete("/:id", [authenticate], repertoireSong.delete);

    // Delete all repertoireSong
   // router.delete("/:id", [authenticate], repertoireSong.deleteAll);

    app.use('/performance-t4/repertoireSong', router); 
};