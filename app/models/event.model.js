
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
      eventSessionId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
      },
      facultyAvailabilityId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
      },
      accompanistAvailabilityId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
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
      isForeign: 
      {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      translation: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      capstoneLevel: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      isReady: 
      {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
    });
  
    return Event;
};