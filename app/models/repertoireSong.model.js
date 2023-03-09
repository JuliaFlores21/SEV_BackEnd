
module.exports = (sequelize, Sequelize) => 
{
    const RepertoireSong = sequelize.define("repertoireSong", 
    {
      id: 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      semester:
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return RepertoireSong;
};