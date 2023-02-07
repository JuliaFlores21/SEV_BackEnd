
const db = require("../models");
const Song = db.song;
const Op = db.Sequelize.Op;

// Create and Save a new Song
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Song
  const song = {
    id: req.body.id,
    composerId: req.body.composerId,
    title: req.body.title,
  };

  // Save Event Song in the database
  Song.create(song)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the song."
      });
    });
};

// Retrieve all songs from the database.
exports.findAll = (req, res) => {
  const songId = req.query.songId;
  var condition = songId ? {
    songId: {
      [Op.like]: `%${songId}%`
    }
  } : null;

  Song.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving songs."
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

// Find a single Song with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Song.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Song with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Song with id=" + id
      });
    });
};

// Update a Song by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Song.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Song was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Song with id=${id}. Maybe Song was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Song with id=" + id
      });
    });
};

// Delete a Song with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Song.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Song was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Song with id=${id}. Maybe Event Song was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Song with id=" + id
      });
    });
};

// Delete all Songs from the database.
exports.deleteAll = (req, res) => {
  Song.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Songs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all songs."
      });
    });
};

// Find all published songs
exports.findAllPublished = (req, res) => {
  const songId = req.query.songId;

  Song.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving songs."
      });
    });
};