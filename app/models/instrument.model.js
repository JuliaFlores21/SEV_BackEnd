
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
        allowNull: false,
        foreignKey: true
      },
      privateInstructorId: 
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
      type: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  
    return Instrument;
};