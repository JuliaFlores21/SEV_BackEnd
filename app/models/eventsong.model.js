
module.exports = (sequelize, Sequelize) => 
{
    const EventSong = sequelize.define("eventsong", 
    {
      id: 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    });
  
    return EventSong;
};