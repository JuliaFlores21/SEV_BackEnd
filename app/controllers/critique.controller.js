
const db = require("../models");
const Critique = db.critique;
const Op = db.Sequelize.Op;

// Create and Save a new Critique
exports.create = (req, res) => {
  // Validate request
  if (!req.body.date) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Critique
  const critique = {
    date: req.body.date,
    deportment: req.body.deportment,
    deportmentGrade: req.body.deportmentGrade,
    tone: req.body.tone,
    toneGrade: req.body.toneGrade,
    accuracy: req.body.accuracy,
    accuracyGrade: req.body.accuracyGrade,
    technique: req.body.technique,
    techniqueGrade: req.body.techniqueGrade,
    interpretation: req.body.interpretation,
    interpretationGrade: req.body.interpretationGrade,
    balance: req.body.balance,
    balanceGrade: req.body.balanceGrade,
    diction: req.body.diction,
    dictionGrade: req.body.dictionGrade,
    performSuggest: req.body.performSuggest,
    hasPassed: req.body.hasPassed
  };

  // Save Critique in the database
  Critique.create(critique)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Critique."
      });
    });
};

// Retrieve all Critiques from the database.
exports.findAll = (req, res) => {
  const critiqueId = req.query.critiqueId;
  var condition = critiqueId ? {
    critiqueId: {
      [Op.like]: `%${critiqueId}%`
    }
  } : null;

  Critique.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving critiques."
      });
    });
};

// Retrieve all Critiques for a student from the database.           -------------> how is different from findAll?
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

// Find a single Critique with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Critique.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Critique with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Critique with id=" + id
      });
    });
};

// Update a Critique by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Critique.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Critique was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Critique with id=${id}. Maybe Critique was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Critique with id=" + id
      });
    });
};

// Delete a Critique with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Critique.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Critique was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Critique with id=${id}. Maybe Critique was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Critique with id=" + id
      });
    });
};

// Delete all Critiques from the database.
exports.deleteAll = (req, res) => {
  Critique.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Critiques were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all critiques."
      });
    });
};

// Find all failed critiques -------------------------------------------------------------?
/*exports.findAllPublished = (req, res) => {
  const critiqueId = req.query.critiqueId;

  Critique.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving critiques."
      });
    });
};*/