 
 const db = require("../models");
 const Repertoire = db.repertoire;
 const Op = db.Sequelize.Op;
 
 // Create and Save a Repertoire
 exports.create = (req, res) => {
   // Validate request
   if (!req.body.title) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
     return;
   }
 
   // Create a Repertoire
   const repertoire = {
     id: req.body.id,
     studentId: req.body.studentId,
     eventSongId: req.body.eventSongId,
     dateAdded: req.body.dateAdded,
   };
 
   // Save Repertoire in the database
   Repertoire.create(repertoire)
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the event."
       });
     });
 };
 
 // Retrieve all repertoires from the database.
 exports.findAll = (req, res) => {
   const repertoireId = req.query.repertoireId;
   var condition = repertoireId ? {
     repertoireId: {
       [Op.like]: `%${repertoireId}%`
     }
   } : null;
 
   Repertoire.findAll({ where: condition })
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while retrieving repertoires."
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
 
 // Find a single Repertoire with an id
 exports.findOne = (req, res) => {
   const id = req.params.id;
   Repertoire.findByPk(id)
     .then(data => {
       if (data) {
         res.send(data);
       } else {
         res.status(404).send({
           message: `Cannot find Repertoire with id=${id}.`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Error retrieving Repertoire with id=" + id
       });
     });
 };
 
 // Update a Repertoire by the id in the request
 exports.update = (req, res) => {
   const id = req.params.id;
   Repertoire.update(req.body, {
     where: { id: id }
   })
     .then(num => {
       if (num == 1) {
         res.send({
           message: "Repertoire was updated successfully."
         });
       } else {
         res.send({
           message: `Cannot update Repertoire with id=${id}. Maybe Repertoire was not found or req.body is empty!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Error updating Repertoire with id=" + id
       });
     });
 };
 
 // Delete a Repertoire with the specified id in the request
 exports.delete = (req, res) => {
   const id = req.params.id;
   Repertoire.destroy({
     where: { id: id }
   })
     .then(num => {
       if (num == 1) {
         res.send({
           message: "Repertoire was deleted successfully!"
         });
       } else {
         res.send({
           message: `Cannot delete Repertoire with id=${id}. Maybe Repertoire was not found!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Could not delete repertoire with id=" + id
       });
     });
 };
 
 // Delete all Repertoires from the database.
 exports.deleteAll = (req, res) => {
   Repertoire.destroy({
     where: {},
     truncate: false
   })
     .then(nums => {
       res.send({ message: `${nums} repertoires were deleted successfully!` });
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while removing all repertoires."
       });
     });
 };
 
 // Find all published repertoires
 exports.findAllPublished = (req, res) => {
   const repertoireId = req.query.repertoireId;
 
   Repertoire.findAll({ where: { published: true } })
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while retrieving repertoires."
       });
     });
 };