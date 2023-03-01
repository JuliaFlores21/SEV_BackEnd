module.exports = app => {
    const availability = require("../controllers/availability.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new available timeslot
    router.post("/", [authenticate], availability.create);
  
    // Retrieve all availiability time 
    router.get("/", [authenticate], availability.findAll);
  
    // Retrieve a single availability with id
    router.get("/:id", [authenticate], availability.findOne);
  
    // Update a availability with id
    router.put("/:id", [authenticate], availability.update);
  
    // Delete a availability with id
    router.delete("/:id", [authenticate], availability.delete);
  
    // Delete all availability
    // router.delete("/", [authenticate], availability.deleteAll);
  
    app.use('/performance-t4/availability', router);
  };