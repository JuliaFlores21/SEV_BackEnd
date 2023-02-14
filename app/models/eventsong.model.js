
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
        allowNull : false
      },
      eventSessionId:
      {
        type: Sequelize.INTEGER,
        allowNull : false 
      }
    });
  
    return EventSong;
};