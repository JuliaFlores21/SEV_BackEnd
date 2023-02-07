
module.exports = (sequelize, Sequelize) => 
{
    const EventSong = sequelize.define("eventsong", 
    {
      id: 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      repertoireId: 
      {
        type: Sequelize.INTEGER,
        allowNull : false,
        foreignKey: true
      },
      songId: 
      {
        type: Sequelize.INTEGER,
        allowNull : false,
        foreignKey: true
      },
    });
  
    return EventSong;
};