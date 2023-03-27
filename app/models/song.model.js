
module.exports = (sequelize, Sequelize) => 
{
    const Song = sequelize.define("song", 
    {
      id: 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: 
      {
        type: Sequelize.STRING,
        allowNull : false
      },
      language: 
      {
        type: Sequelize.STRING
      },
      translation: 
      {
        type: Sequelize.STRING
      }
    });
  
    return Song;
};