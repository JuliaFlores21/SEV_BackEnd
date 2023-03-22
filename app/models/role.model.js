
module.exports = (sequelize, Sequelize) => 
{
    const Role = sequelize.define("role", 
    {
      id: 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      roleType: 
      {
        type: Sequelize.STRING
      },
      facultyType: 
      {
        type: Sequelize.STRING
      },
      facultyBio:
      {
        type: Sequelize.STRING
      },
      studentId: 
      {
        type: Sequelize.INTEGER
      },
      studentClassification: 
      {
        type: Sequelize.STRING
      },
      studentSemester: 
      {
        type: Sequelize.INTEGER
      },
      studentMajor: 
      {
        type: Sequelize.STRING
      },
      incomingStudentPassword: 
      {
        type: Sequelize.STRING
      },
      isApproved: 
      {
        type: Sequelize.BOOLEAN
      },
    });
  
    return Role;
};