
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
      isForeign: 
      {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      translation: 
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Song;
};