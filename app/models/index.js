
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

//Role Table:
// foreign key for role
db.user.hasMany(db.role, { as: 'role'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.role.belongsTo(db.user, { as: 'user'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

//Intrument Table:
// foreign key for instrument 
db.role.hasMany(db.instrument, { as: 'instrument'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.instrument.belongsTo(db.role, { as: 'role'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE', });

//ask about FK between instrument and role (student.id, accompanist.id and privateInstructor.id)

//Availability Table:
// foreign key for availability and role
db.role.hasMany(db.availability, { as: 'availability' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.availability.belongsTo(db.role, { as: 'role' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

//ask about FK between availability and role (faculty.id and accompanist.id)

// foreign key for availability and event
db.event.hasMany(db.availability, { as: 'availability' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.availability.belongsTo(db.event, { as: 'event' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

//ask about events FK (event table)

//Event Session Table:
// foreign key for event session and event 
db.event.hasMany(db.eventsession, { as: 'eventsession' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.eventsession.belongsTo(db.event, { as: 'event' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

// foreign key for event session and role
db.role.hasMany(db.eventsession, { as: 'eventsession' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.eventsession.belongsTo(db.role, { as: 'role' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

//ask about FK between event session and role (student.id, instructor.id and accompanist.id)

//ask about event session critique and event song FK (event session table)

//Critique Table:
// foreign key for event session and critique
db.eventsession.hasMany(db.critique, { as: 'critique' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.critique.belongsTo(db.eventsession, { as: 'eventsession' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

// foreign key for role and critique
db.role.hasMany(db.critique, { as: 'critique' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.critique.belongsTo(db.role, { as: 'role' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

//Event Song Table:
// foreign key for event session and event song
db.eventsession.hasMany(db.eventsong, { as: 'eventsong' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.eventsong.belongsTo(db.eventsession, { as: 'eventsession' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

// foreign key for event session and event song
db.song.hasMany(db.eventsong, { as: 'eventsong' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.eventsong.belongsTo(db.song, { as: 'song' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

//Song Table:
// foreign key for event session and event song
db.role.hasMany(db.song, { as: 'song' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.song.belongsTo(db.role, { as: 'role' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

// foreign key for event session and event song
db.composer.hasMany(db.song, { as: 'song' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.song.belongsTo(db.composer, { as: 'composer' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

//Composer Table -> song FK (can a song have more than one composer?)

module.exports = db;