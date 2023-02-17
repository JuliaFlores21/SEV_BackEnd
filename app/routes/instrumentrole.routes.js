
module.exports = app => {
    const instrumentrole = require("../controllers/instrumentrole.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Instrument Role
    router.post("/", [authenticate], instrumentrole.create);

    // Retrieve all Instrument Role
    router.get("/", [authenticate], instrumentrole.findAll);

    // Retrieve a single Instrument Role with id
    router.get("/:id", [authenticate], instrumentrole.findOne);

    // Update a Instrument Role with id
    router.put("/:id", [authenticate], instrumentrole.update);

    // Delete a Instrument Role with id
    router.delete("/:id", [authenticate], instrumentrole.delete);

    // Delete all Instrument Roles
    // router.delete("/:id", [authenticate], instrumentrole.deleteAll);

    app.use('/instrumentrole', router); 
};