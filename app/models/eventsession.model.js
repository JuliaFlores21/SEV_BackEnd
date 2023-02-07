
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
        allowNull: false,
        foreignKey: true
      },
      instructorId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
      },
      accompanistId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
      },
      eventId: 
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