
const db = require("../models");
const Level = db.level;
const Op = db.Sequelize.Op;

// Create and Save a new Level
exports.create = (req, res) => 
{
  // Validate request
  if (!req.body.level) 
  {
    res.status(400).send({
      message: "Level can not be empty!"
    });
    return;
  }

  // Create a Level
  const level = 
  {
    levelNumber: req.body.levelNumber,
    oneHourDescription: req.body.oneHourDescription,
    twoHourDescription: req.body.twoHourDescription
  };

  // Save Level in the database
  Level.create(level)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Level."
      });
    });
};

// Retrieve all levels from the database.
exports.findAll = (req, res) => {
  const levelId = req.query.levelId;
  var condition = levelId ? {
    levelId: {
      [Op.like]: `%${levelId}%`
    }
  } : null;

  Level.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving levels."
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

// Find a single Level with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Level.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Level with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Level with id=" + id
      });
    });
};

// Update a Level by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Level.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Level was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Level with id=${id}. Maybe Level was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Level with id=" + id
      });
    });
};

// Delete a Level with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Level.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Level was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Level with id=${id}. Maybe Availability was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Level with id=" + id
      });
    });
};

// Delete all Levels from the database.
exports.deleteAll = (req, res) => {
  Level.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} levels were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all levels."
      });
    });
};