
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
      },
      isVoice: 
      {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    });
  
    return Instrument;
};