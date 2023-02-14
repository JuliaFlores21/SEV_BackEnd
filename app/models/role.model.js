
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
      userId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      roleType: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      facultyType: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      accompanistType: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      studentId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      studentClassification: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      studentSemester: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      studentMajor: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      studentInstrument: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      studentVocalType: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      studentLevel: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      studentPrivateInstructor: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      studentAccompanist: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      incomingStudentPassword: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  
    return Role;
};