
const db = require("../models");
const RepertoireSong = db.repertoireSong;
const Song = db.song;
const Composer = db.composer;
const Op = db.Sequelize.Op;

// Create and Save a new RepertoireSong
exports.create = (req, res) => {
  // Validate request
  if (!req.body.semester) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a RepertoireSong
  const repertoireSong = {
    semester: req.body.semester,
    studentId: req.body.studentId,
    songId: req.body.songId
  };

  // Save RepertoireSong in the database
  RepertoireSong.create(repertoireSong)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the repertoireSong."
      });
    });
};

// Retrieve all repertoireSongs from the database.
exports.findAll = (req, res) => {
  const repertoireSongId = req.query.repertoireSongId;
  var condition = repertoireSongId ? {
    repertoireSongId: {
      [Op.like]: `%${repertoireSongId}%`
    }
  } : null;

  RepertoireSong.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving repertoireSongs."
      });
    });
};

// Retrieve all Songs for a student from the database. 
exports.findAllForUser = (req, res) => {
  const userId = req.params.studentId;
  RepertoireSong.findAll({ where: { studentId: userId },      
    include:[{model: Song, as: "song", required: true, include: [{model: Composer, as: "composer", required: true}]}] 
 })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Repertoire Songs for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Repertoire Songs for user with id=" + userId,
      });
    });
};

// Find a single RepertoireSong with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  RepertoireSong.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find RepertoireSong with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving RepertoireSong with id=" + id
      });
    });
};

// Update a RepertoireSong by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  RepertoireSong.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "RepertoireSong was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update RepertoireSong with id=${id}. Maybe RepertoireSong was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating RepertoireSong with id=" + id
      });
    });
};

// Delete a RepertoireSong with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  RepertoireSong.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "RepertoireSong was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete RepertoireSong with id=${id}. Maybe Event RepertoireSong was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete RepertoireSong with id=" + id
      });
    });
};

// Delete all RepertoireSongs from the database.
exports.deleteAll = (req, res) => {
  RepertoireSong.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} RepertoireSongs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all repertoireSongs."
      });
    });
};