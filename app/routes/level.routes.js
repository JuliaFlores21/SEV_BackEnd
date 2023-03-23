
module.exports = app => {
    const level = require("../controllers/level.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new level
    router.post("/", [authenticate], level.create);
  
    // Retrieve all level time 
    router.get("/", [authenticate], level.findAll);
  
    // Retrieve a single level with id
    router.get("/:id", [authenticate], level.findOne);
  
    // Update a level with id
    router.put("/:id", [authenticate], level.update);
  
    // Delete a level with id
    router.delete("/:id", [authenticate], level.delete);
  
    // Delete all level
    // router.delete("/", [authenticate], level.deleteAll);
  
    app.use('/performance-t4/level', router);
  };