
module.exports = (sequelize, Sequelize) => 
{
    const Repertoire = sequelize.define("repertoire", 
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
        allowNull: false,
        foreignKey: true
      },
      eventSongId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
      },
      dateAdded: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  
    return Repertoire;
};