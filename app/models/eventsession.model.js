
module.exports = (sequelize, Sequelize) => 
{
    const EventSession = sequelize.define("eventsession", 
    {
      id: 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
      }
    });
  
    return EventSession;
};