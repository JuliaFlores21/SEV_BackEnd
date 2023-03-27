
const db = require("../models");
const Event = db.event;
const Op = db.Sequelize.Op;

// Create and Save a new Event
exports.create = (req, res) => {
  // Validate request

  if (!req.body.eventType || !req.body.date) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Event
  const event = {
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    duration: req.body.duration,
    eventType: req.body.eventType,
    isReady: req.body.isReady
  };

  // Save Event in the database
  Event.create(event)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the event."
      });
    });
};

// Retrieve all events from the database.
exports.findAll = (req, res) => {
  const eventId = req.query.eventId;
  var condition = eventId ? {
    eventId: {
      [Op.like]: `%${eventId}%`
    }
  } : null;

  Event.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving events."
      });
    });
};

// Find a single Event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Event.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Event with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Event with id=" + id
      });
    });
};

// Update a Event by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Event.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Event with id=" + id
      });
    });
};

// Delete a Event with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Event.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event with id=" + id
      });
    });
};

// Delete all Events from the database.
exports.deleteAll = (req, res) => {
  Event.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Events were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all events."
      });
    });
};

// Find all ready events              ----------------------------------------------> do we need it?
/*exports.findAllPublished = (req, res) => {
  const eventId = req.query.eventId;

  Event.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving events."
      });
    });
};*/