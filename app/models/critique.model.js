
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
      date: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      deportment: 
      {
        type: Sequelize.STRING
      },
      deportmentGrade: 
      {
        type: Sequelize.STRING
      },
      tone: 
      {
        type: Sequelize.STRING
      },
      toneGrade: 
      {
        type: Sequelize.STRING
      },
      accuracy: 
      {
        type: Sequelize.STRING
      },
      accuracyGrade: 
      {
        type: Sequelize.STRING
      },
      technique: 
      {
        type: Sequelize.STRING
      },
      techniqueGrade: 
      {
        type: Sequelize.STRING
      },
      interpretation: 
      {
        type: Sequelize.STRING
      },
      interpretationGrade: 
      {
        type: Sequelize.STRING
      },
      balance: 
      {
        type: Sequelize.STRING
      },
      balanceGrade: 
      {
        type: Sequelize.STRING
      },
      diction: 
      {
        type: Sequelize.STRING
      },
      dictionGrade: 
      {
        type: Sequelize.STRING
      },
      performSuggest: 
      {
        type: Sequelize.STRING
      },
      hasPassed: 
      {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Critique;
};