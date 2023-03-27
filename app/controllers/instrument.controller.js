
const db = require("../models");
const Instrument = db.instrument;
const Op = db.Sequelize.Op;

// Create and Save a new Instrument
exports.create = (req, res) => {

  // Validate request
  if (!req.body.type) {
    res.status(400).send({
      message: "Instrument and Voice cannot be empty!"
    });
    return;
  }

  // Create a Instrument 
  const instrument = {
    type: req.body.type,
    isVoice: req.body.isVoice
  };

  // Save Instrument in the database
  Instrument.create(instrument)
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
  const instrumentId = req.query.instrumentId;
  var condition = instrumentId ? {
    instrumentId: {
      [Op.like]: `%${instrumentId}%`
    }
  } : null;

  Instrument.findAll({ where: condition })
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

// Find a single Instrument with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Instrument.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Instrument with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Instrument with id=" + id
      });
    });
};

// Update a Instrument by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Instrument.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Instrument was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Instrument with id=${id}. Maybe Instrument was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Instrument with id=" + id
      });
    });
};

// Delete a Instrument with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Instrument.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Instrument was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Instrument with id=${id}. Maybe Instrument was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Instrument with id=" + id
      });
    });
};

// Delete all Instruments from the database.
exports.deleteAll = (req, res) => {
  Instrument.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Instruments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Instruments."
      });
    });
};