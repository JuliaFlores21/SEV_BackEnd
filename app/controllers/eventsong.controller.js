
const db = require("../models");
const EventSong = db.eventsong;
const Op = db.Sequelize.Op;

// Create and Save a new Event Song
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Event Song
  const eventsong = {
    id: req.body.id,
    repertoireId: req.body.repertoireId,
    songId: req.body.songId,
  };

  // Save Event Song in the database
  EventSong.create(eventsong)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the event song."
      });
    });
};

// Retrieve all event songs from the database.
exports.findAll = (req, res) => {
  const eventSongId = req.query.eventSongId;
  var condition = eventSongId ? {
    eventSongId: {
      [Op.like]: `%${eventSongId}%`
    }
  } : null;

  EventSong.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving event songs."
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

// Find a single Event Song with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  EventSong.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Event Song with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Event Song with id=" + id
      });
    });
};

// Update a Event Song by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  EventSong.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event Song was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Event Song with id=${id}. Maybe Event Song was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Event Song with id=" + id
      });
    });
};

// Delete a Event Song with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  EventSong.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event Song was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Event Song with id=${id}. Maybe Event Song was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event Song with id=" + id
      });
    });
};

// Delete all Event Songs from the database.
exports.deleteAll = (req, res) => {
  EventSong.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Event Songs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all event songs."
      });
    });
};

// Find all published event songs
exports.findAllPublished = (req, res) => {
  const eventSongId = req.query.eventSongId;

  EventSong.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving event songs."
      });
    });
};