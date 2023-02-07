
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
      composerId: 
      {
        type: Sequelize.INTEGER,
        allowNull : false,
        foreignKey: true
      },
      title: 
      {
        type: Sequelize.STRING,
        allowNull : false,
      },
    });
  
    return Song;
};