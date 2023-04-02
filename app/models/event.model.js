
module.exports = (sequelize, Sequelize) => 
{
    const Event = sequelize.define("event", 
    {
      id: 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      date: 
      {
        type: Sequelize.STRING,
        allowNull: false
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
      duration: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      eventType: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      isReady: 
      {
        type: Sequelize.BOOLEAN,
      }
    });
  
    return Event;
};