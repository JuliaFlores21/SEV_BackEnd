
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
        allowNull : true //check
      },
      accompanistId: 
      {
        type: Sequelize.INTEGER,
        allowNull : true //check
      },
      eventId: 
      {
        type: Sequelize.INTEGER,
        allowNull : false
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