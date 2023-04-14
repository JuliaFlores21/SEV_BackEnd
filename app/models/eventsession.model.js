
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
      hasPassed: 
      {
        type: Sequelize.STRING
      }
    });
  
    return EventSession;
};