module.exports = app => {
    const eventsong = require("../controllers/eventsong.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new eventsong
    router.post("/", [authenticate], eventsong.create);
  
    // Retrieve all eventsong
    router.get("/", [authenticate], eventsong.findAll);
  
    // Retrieve a single eventsong with id
    router.get("/:id", [authenticate], eventsong.findOne);
  
    // Update a eventsong with id
    router.put("/:id", [authenticate], eventsong.update);
  
    // Delete a eventsong with id
    router.delete("/:id", [authenticate], eventsong.delete);
  
    // Delete all eventsong
    // router.delete("/", [authenticate], eventsong.deleteAll);
  
    app.use('/performance-t4/eventsong', router);
  };