
module.exports = (sequelize, Sequelize) => 
{
    const InstrumentRole = sequelize.define("instrumentrole", 
    {
      id: 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    });
  
    return InstrumentRole;
};