module.exports = (sequelize, Sequelize) => 
{
    const Notification = sequelize.define("notification", 
    {
      id: 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: 
      {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: 
      {
        type: Sequelize.STRING
      },
    });
  
    return Notification;
};