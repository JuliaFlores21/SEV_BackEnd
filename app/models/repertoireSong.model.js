
module.exports = (sequelize, Sequelize) => 
{
    const RepertoireSong = sequelize.define("repertoireSong", 
    {
      id: 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    });
  
    return RepertoireSong;
};