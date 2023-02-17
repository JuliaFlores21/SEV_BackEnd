
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
      startTime: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      endTime: 
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Availability;
};