module.exports = app => {
    const notification = require("../controllers/notification.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new notification
    router.post("/", [authenticate], notification.create);
  
    // Retrieve all notification time 
    router.get("/", [authenticate], notification.findAll);
  
    // Retrieve a single notification with id
    router.get("/:id", [authenticate], notification.findOne);

    // Retrieve all Notifications for Role id
    router.get("/role/:roleId", [authenticate], notification.getNotificationsForRole);

    // Update a notification with id
    router.put("/:id", [authenticate], notification.update);
  
    // Delete a notification with id
    router.delete("/:id", [authenticate], notification.delete);
  
    // Delete all notification
    // router.delete("/", [authenticate], notification.deleteAll);
  
    app.use('/performance-t4/notification', router);
  };