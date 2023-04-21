const db = require("../models");
const Notification = db.notification;
const Role = db.role;
const Op = db.Sequelize.Op;

// Create and Save a new Notification
exports.create = (req, res) => 
{
  // Validate request
  if (!req.body.title && !req.body.description) 
  {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  const notification = 
      {
        description: req.body.description,
        title: req.body.title,
        type: req.body.type,
        roleId: req.body.roleId,
        eventId: req.body.eventId,
        eventsessionId: req.body.eventsessionId,
        composerId: req.body.composerId,
        songId: req.body.songId,
        availabilityId: req.body.availabilityId,
      };

      // Save Notification in the database
      Notification.create(notification)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Notification."
          });
        });

  // const roleType = req.body.type;
  // console.log('Role Type  == ',roleType);
  // var allRoles = [];
  // Role.findAll({ where: {roleType : roleType} })
  //   .then(data => {
  //      //console.log('===========2',data);
  //      for(let i = 0; i < data.length; i++){
  //       allRoles.push(data[i].dataValues);
  //      }
  //      console.log('all roles', allRoles);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving roles."
  //     });
  //   });







    // console.log("roles for notification");
    // console.log(allRoles);

    
    // var allNotifications = [];
    //   for(let i = 0; i < allRoles.length; i++){

      
    //   // Create a Notification
    //   const notification = 
    //   {
    //     description: req.body.description,
    //     title: req.body.title,
    //     type: req.body.type,
    //     roleId: allRoles[i].roleId,
    //     eventId: req.body.eventId,
    //     eventsessionId: req.body.eventsessionId,
    //     composerId: req.body.composerId,
    //     songId: req.body.songId,
    //     availabilityId: req.body.availabilityId,
    //   };
    //   allNotifications.push(notification);
    //   }
    //   // Save Notification in the database
    //   Notification.create(allNotifications)
    //     .then(data => {
    //       res.send(data);
    //     })
    //     .catch(err => {
    //       res.status(500).send({
    //         message:
    //           err.message || "Some error occurred while creating the Notification."
    //       });
    //     });

};

// Retrieve all notifications from the database.
exports.findAll = (req, res) => {
  const notificationId = req.query.notificationId;
  var condition = notificationId ? {
    notificationId: {
      [Op.like]: `%${notificationId}%`
    }
  } : null;

  Notification.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notifications."
      });
    });
};

exports.getNotificationsForRole = (req, res) => {
  const roleId = req.params.roleId;
  Notification.findAll({ where: { roleId: roleId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Role for user with id=${roleId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Role for user with id=" + roleId,
      });
    });
 };



// Retrieve all Lessons for a tutorial from the database.
// exports.findAllForTutorial = (req, res) => {
//   const tutorialId = req.params.tutorialId;

//   Lesson.findAll({ where: { tutorialId : tutorialId } })
//   .then(data => {
//     res.send(data);
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while retrieving lessons."
//     });
//   });
// };

// Find a single Notification with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Notification.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Notification with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Notification with id=" + id
      });
    });
};

// Update a Notification by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Notification.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Notification was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Notification with id=${id}. Maybe Notification was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Notification with id=" + id
      });
    });
};

// Delete a Notification with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Notification.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Notification was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Notification with id=${id}. Maybe Availability was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Notification with id=" + id
      });
    });
};

// Delete all Notifications from the database.
exports.deleteAll = (req, res) => {
  Notification.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} notifications were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all notifications."
      });
    });
};