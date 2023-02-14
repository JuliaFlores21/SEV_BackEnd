
module.exports = (sequelize, Sequelize) => 
{
    const Critique = sequelize.define("critique", 
    {
      id: 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      studentId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      facultyId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      eventSessionId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      deportment: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      deportmentGrade: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      tone: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      toneGrade: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      accuracy: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      accuracyGrade: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      technique: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      techniqueGrade: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      interpretation: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      interpretationGrade: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      balance: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      balanceGrade: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      diction: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      dictionGrade: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      performSuggest: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      hasPassed: 
      {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
    });
  
    return Critique;
};