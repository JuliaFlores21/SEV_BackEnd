
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
      type: 
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Instrument;
};