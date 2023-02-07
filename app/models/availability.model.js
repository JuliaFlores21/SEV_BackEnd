
module.exports = (sequelize, Sequelize) => 
{
    const Availability = sequelize.define("availability", 
    {
      id: 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      facultyId: 
      {
        type: Sequelize.INTEGER,
        allowNull : false,
        foreignKey: true
      },
      accompanistId: 
      {
        type: Sequelize.INTEGER,
        allowNull : false,
        foreignKey: true
      },
      eventId: 
      {
        type: Sequelize.INTEGER,
        allowNull : false,
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
    });
  
    return Availability;
};