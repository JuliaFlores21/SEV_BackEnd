module.exports = app => {
    const composer = require("../controllers/composer.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new composer
    router.post("/", [], composer.create);
  
    // Retrieve all composer time 
    router.get("/", [], composer.findAll);
  
    // Retrieve a single composer with id
    router.get("/:id", [], composer.findOne);
  
    // Update a composer with id
    router.put("/:id", [], composer.update);
  
    // Delete a composer with id
    router.delete("/:id", [], composer.delete);
  
    // Delete all composer
    // router.delete("/", [authenticate], composer.deleteAll);
  
    app.use('/performance-t4/composer', router);
  };