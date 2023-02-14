
module.exports = (sequelize, Sequelize) => 
{
    const EventSession = sequelize.define("eventSession", 
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
        allowNull: false
      },
      instructorId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      accompanistId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      eventId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      critiqueId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false //check
      },
      eventSongId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false //check
      },
      startTime: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      endTime: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      eventType: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  
    return EventSession;
};