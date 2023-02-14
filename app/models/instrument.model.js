
module.exports = (sequelize, Sequelize) => 
{
    const Instrument = sequelize.define("instrument", 
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
        allowNull: false //check
      },
      privateInstructorId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      accompanistId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  
    return Instrument;
};