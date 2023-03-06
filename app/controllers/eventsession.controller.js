
const db = require("../models");
const EventSession = db.eventsession;
const Op = db.Sequelize.Op;

// Create and Save a new Event Session
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Event Session
  const eventsession = {
    id: req.body.id,
    studentId: req.body.studentId,
    privateInstructorId: req.body.instructorId,
    accompanistId: req.body.accompanistId,
    eventId: req.body.eventId,
    startTime: req.body.startTime,
    endTime: req.body.endTime
    };

  // Save Event Session in the database
  EventSession.create(eventsession)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the event session."
      });
    });
};

// Retrieve all event sessions from the database.
exports.findAll = (req, res) => {
  const eventSessionId = req.query.eventSessionId;
  var condition = eventSessionId ? {
    eventSessionId: {
      [Op.like]: `%${eventSessionId}%`
    }
  } : null;

  EventSession.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving event sessions."
      });
    });
};

// Retrieve all Event Sessions for an event from the database.
exports.findAllForEvent = (req, res) => {
   const eventId = req.params.eventId;

   EventSession.findAll({ where: { eventId : eventId } })
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while retrieving event sessions."
     });
   });
 };

// Find a single Event Session with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  EventSession.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Event Session with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Event Session with id=" + id
      });
    });
};

// Update a Event Session by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  EventSession.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event Session was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Event Session with id=${id}. Maybe Event Session was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Event Session with id=" + id
      });
    });
};

// Delete a Event Session with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  EventSession.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event Session was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Event Session with id=${id}. Maybe Event Session was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event Session with id=" + id
      });
    });
};

// Delete all Event Sessions from the database.
exports.deleteAll = (req, res) => {
  EventSession.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Event Sessions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all event sessions."
      });
    });
};