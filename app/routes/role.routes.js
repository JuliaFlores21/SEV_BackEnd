
module.exports = app => {
    const role = require("../controllers/role.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new role
    router.post("/", [authenticate], role.create);

    // Retrieve all roles
    router.get("/", [authenticate], role.findAllForTutorial);

    // Retrieve a single role
    router.get("/:id", [authenticate], role.findOne);

    // Update a Event role
    router.put("/:id", [authenticate], role.update);

    // Delete a role
    router.delete("/:id", [authenticate], role.delete);

    // Delete all roles
    // router.delete("/:id", [authenticate], role.deleteAll);

    app.use('/role', router); 
};