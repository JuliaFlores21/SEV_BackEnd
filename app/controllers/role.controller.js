
 const db = require("../models");
 const Role = db.role;
 const Op = db.Sequelize.Op;
 
 // Create and Save a Role
 exports.create = (req, res) => {
   // Validate request
   if (!req.body.title) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
     return;
   }
 
   // Create a Role
   const role = {
     id: req.body.id,
     userId: req.body.userId,
     roleType: req.body.roleType,
     facultyType: req.body.facultyType,
     facultyBio: req.body.facultyBio,
     studentId: req.body.studentId,
     studentClassification: req.body.studentClassification,
     studentSemester: req.body.studentSemester,
     studentMajor: req.body.studentMajor,
     studentLevel: req.body.studentLevel,
     incomingStudentPassword: req.body.incomingStudentPassword,
     isApproved: req.body.isApproved
   };
 
   // Save Role in the database
   Role.create(role)
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the role."
       });
     });
 };
 
 // Retrieve all roles from the database.
 exports.findAll = (req, res) => {
   const roleId = req.query.roleId;
   var condition = roleId ? {
     roleId: {
       [Op.like]: `%${roleId}%`
     }
   } : null;
 
   Role.findAll({ where: condition })
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while retrieving roles."
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
 
 // Find a single Role with an id
 exports.findOne = (req, res) => {
   const id = req.params.id;
   Role.findByPk(id)
     .then(data => {
       if (data) {
         res.send(data);
       } else {
         res.status(404).send({
           message: `Cannot find Role with id=${id}.`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Error retrieving Role with id=" + id
       });
     });
 };
 
 // Update a Role by the id in the request
 exports.update = (req, res) => {
   const id = req.params.id;
   Role.update(req.body, {
     where: { id: id }
   })
     .then(num => {
       if (num == 1) {
         res.send({
           message: "Role was updated successfully."
         });
       } else {
         res.send({
           message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Error updating Role with id=" + id
       });
     });
 };
 
 // Delete a Role with the specified id in the request
 exports.delete = (req, res) => {
   const id = req.params.id;
   Role.destroy({
     where: { id: id }
   })
     .then(num => {
       if (num == 1) {
         res.send({
           message: "Role was deleted successfully!"
         });
       } else {
         res.send({
           message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Could not delete role with id=" + id
       });
     });
 };
 
 // Delete all Roles from the database.
 exports.deleteAll = (req, res) => {
   Role.destroy({
     where: {},
     truncate: false
   })
     .then(nums => {
       res.send({ message: `${nums} roles were deleted successfully!` });
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while removing all roles."
       });
     });
 };