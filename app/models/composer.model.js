
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
      songId: 
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
      },
      firstName: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      nationality: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      birthday: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      deathDate: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  
    return Composer;
};