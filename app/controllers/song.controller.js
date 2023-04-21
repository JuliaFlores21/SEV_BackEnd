
const db = require("../models");
const Song = db.song;
const Composer = db.composer;
const Op = db.Sequelize.Op;
const nodemailer = require('nodemailer');
const email_pw = process.env.EMAIL_PW


//Configuring Nodemailer transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
      user: 'julia.flores@eagles.oc.edu',
      pass: email_pw
  }
});

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
    title: req.body.title,
    language: req.body.language,
    translation: req.body.translation,
    composerId: req.body.composerId
  };

  // Save Event Song in the database
  Song.create(song)
    .then(data => {
      sendNewSongEmail(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the song."
      });
    });
};

// Send email when a new composer is added
function sendNewSongEmail(songData) {
  const mailOptions = {
    from: 'julia.flores@eagles.oc.edu',
    to: 'julia.flores@eagles.oc.edu',
    subject: 'New Vocal Piece Added',
    html: `<p>There is a new vocal piece waiting for approval:</p><ul><li>Title: ${songData.title}</li><li>Language: ${songData.language}</li><li>Translation: ${songData.translation}</li></ul>`,
    text: `There is a new composer waiting for approval:\n\nTitle: ${songData.title}\nLanguage: ${songData.language}\nTranslation: ${songData.translation}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
  });
}

// Retrieve all songs from the database.
exports.findAll = (req, res) => {
  const songId = req.query.songId;
  var condition = songId ? {
    songId: {
      [Op.like]: `%${songId}%`
    }
  } : null;

  Song.findAll({ where: condition, include:[{model: Composer, as: "composer", required: true}] })
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