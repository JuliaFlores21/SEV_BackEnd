module.exports = app => {
    const composer = require("../controllers/composer.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new composer
    router.post("/", [authenticate], composer.create);
  
    // Retrieve all composer time 
    router.get("/", [authenticate], composer.findAll);
  
    // Retrieve a single composer with id
    router.get("/:id", [authenticate], composer.findOne);
  
    // Update a composer with id
    router.put("/:id", [authenticate], composer.update);
  
    // Delete a composer with id
    router.delete("/:id", [authenticate], composer.delete);
  
    // Delete all composer
    // router.delete("/", [authenticate], composer.deleteAll);
  
    app.use('/composer', router);
  };