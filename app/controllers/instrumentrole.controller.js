
const db = require("../models");
const InstrumentRole = db.instrumentrole;
const Instrument = db.instrument;
const Op = db.Sequelize.Op;

// Create and Save a new Instrument Role
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Instrument Role
  const instrumentrole = {
    id: req.body.id,
    studentId: req.body.studentId,
    privateInstructorId: req.body.privateInstructorId,
    accompanistId: req.body.accompanistId,
    instrumentId: req.body.instrumentId
  };

  // Save Instrument Role in the database
  InstrumentRole.create(instrumentrole)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the instrument role."
      });
    });
};

// Retrieve all instrument roles from the database.
exports.findAll = (req, res) => {
  const instrumentRoleId = req.query.instrumentroleId;
  var condition = instrumentRoleId ? {
    instrumentroleId: {
      [Op.like]: `%${instrumentRoleId}%`
    }
  } : null;

  InstrumentRole.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving instrument role."
      });
    });
};

// Find all instrument roles from the database for an user
exports.findAllForUser = (req, res) => {
  const userId = req.params.studentId;
  InstrumentRole.findAll({ where: { studentId: userId },
     include:[{model: Instrument, as: "instrument", required: true}] 
    })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Instrument Roles for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Instrument Roles for user with id=" + userId,
      });
    });
};

// Retrieve all Lessons for a tutorial from the database.  -------------------------> for a student?
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

// Find a single Instrument Role with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  InstrumentRole.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Instrument Role with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Instrument Role with id=" + id
      });
    });
};

// Update a Instrument Role by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  InstrumentRole.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Instrument Role was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Instrument Role with id=${id}. Maybe Instrument Role was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Instrument Role with id=" + id
      });
    });
};

// Delete a Instrument Role with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  InstrumentRole.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Instrument Role was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Instrument Role with id=${id}. Maybe Instrument Role was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Instrument Role with id=" + id
      });
    });
};

// Delete all Instrument Roles from the database.
exports.deleteAll = (req, res) => {
  InstrumentRole.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Instrument Roles were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Instrument Roles."
      });
    });
};