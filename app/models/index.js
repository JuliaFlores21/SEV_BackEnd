
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.availability = require("./availability.model.js")(sequelize, Sequelize);
db.composer = require("./composer.model.js")(sequelize, Sequelize);
db.critique = require("./critique.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);
db.eventsession = require("./eventsession.model.js")(sequelize, Sequelize);
db.eventsong = require("./eventsong.model.js")(sequelize, Sequelize);
db.instrument = require("./instrument.model.js")(sequelize, Sequelize);
db.repertoire = require("./repertoire.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.song = require("./song.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

// foreign key for availability
db.user.hasMany(db.session, { as: 'session'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.session.belongsTo(db.user, { as: 'user'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

// foreign key for tutorials
db.user.hasMany(db.tutorial, { as: 'tutorial'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.tutorial.belongsTo(db.user, { as: 'user'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE', });

// foreign key for lessons
db.tutorial.hasMany(db.lesson, { as: 'lesson' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.lesson.belongsTo(db.tutorial, { as: 'tutorial' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

module.exports = db;