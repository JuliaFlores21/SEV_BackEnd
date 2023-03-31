
const db = require("../models");
const Availability = db.availability;
const Op = db.Sequelize.Op;

// Create and Save a new Availability
exports.create = (req, res) => 
{
  // Validate request
  if (!req.body.startTime && !req.body.endTime) 
  {
    res.status(400).send({
      message: "Start Time and End Time can not be empty!"
    });
    return;
  }

  // Create a Availability
  const availability = 
  {
    facultyId: req.body.facultyId,
    accompanistId: req.body.accompanistId,
    eventId: req.body.eventId,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  };

  // Save Availability in the database
  Availability.create(availability)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Availability."
      });
    });
};

// Retrieve all availabilities from the database.
exports.findAll = (req, res) => {
  const availabilityId = req.query.availabilityId;
  var condition = availabilityId ? {
    availabilityId: {
      [Op.like]: `%${availabilityId}%`
    }
  } : null;

  Availability.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving availabilities."
      });
    });
};

// // Find all availabilities from the database for a user
// exports.findAllForUser = (req, res) => {
//   const userId = req.params.userId; //which variable should be here? how to pre define userId?
//   InstrumentRole.findAll({ where: { userId: userId },
//      include:[{model: Instrument, as: "instrument", required: true}] 
//     })
//     .then((data) => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Instrument Roles for user with id=${userId}.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Error retrieving Instrument Roles for user with id=" + userId,
//       });
//     });
// };

// Find a single Availability with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Availability.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Availability with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Availability with id=" + id
      });
    });
};

// Update a Availability by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Availability.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Availability was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Availability with id=${id}. Maybe Availability was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Availability with id=" + id
      });
    });
};

// Delete a Availability with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Availability.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Availability was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Availability with id=${id}. Maybe Availability was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Availability with id=" + id
      });
    });
};

// Delete all Lessons from the database.
exports.deleteAll = (req, res) => {
  Availability.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} availabilities were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all availabilities."
      });
    });
};