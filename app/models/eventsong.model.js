
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
      semester:
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return EventSong;
};