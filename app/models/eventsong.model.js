
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
      songId: 
      {
        type: Sequelize.INTEGER,
        allowNull : false,
        foreignKey: true
      },
    });
  
    return EventSong;
};