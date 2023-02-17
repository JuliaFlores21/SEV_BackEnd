
module.exports = (sequelize, Sequelize) => 
{
    const Composer = sequelize.define("composer", 
    {
      id: 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: 
      {
        type: Sequelize.STRING
      },
      lastName: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      nationality: 
      {
        type: Sequelize.STRING
      },
      birthday: 
      {
        type: Sequelize.STRING
      },
      deathDate: 
      {
        type: Sequelize.STRING
      }
    });
  
    return Composer;
};