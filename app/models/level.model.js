
module.exports = (sequelize, Sequelize) => 
{
    const Level = sequelize.define("level", 
    {
      id: 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      levelNumber: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      oneHourDescription: 
      {
        type: Sequelize.STRING
      },
      twoHourDescription: 
      {
        type: Sequelize.STRING
      }
    });
  
    return Level;
};