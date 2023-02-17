
const db = require("../models");
const Composer = db.composer;
const Op = db.Sequelize.Op;

// Create and Save a new Composer
exports.create = (req, res) => 
{
  // Validate request
  if (!req.body.title) 
  {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Composer
  const composer = 
  {
    id: req.body.id,
    firstName: req.body.firstName,
    lastname: req.body.lastName,
    nationality: req.body.nationality,
    birthday: req.body.birthday,
    deathDate: req.body.deathDate
  };

  // Save Composer in the database
  Composer.create(composer)
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

// Retrieve all composers from the database.
exports.findAll = (req, res) => {
  const composerId = req.query.composerId;
  var condition = composerId ? {
    composerId: {
      [Op.like]: `%${composerId}%`
    }
  } : null;

  Composer.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving composers."
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

// Find a single Composer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Composer.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Composer with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Composer with id=" + id
      });
    });
};

// Update a Composer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Composer.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Composer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Composer with id=${id}. Maybe Composer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Composer with id=" + id
      });
    });
};

// Delete a Composer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Composer.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Composer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Composer with id=${id}. Maybe Availability was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Composer with id=" + id
      });
    });
};

// Delete all Composers from the database.
exports.deleteAll = (req, res) => {
  Composer.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} composers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all composers."
      });
    });
};