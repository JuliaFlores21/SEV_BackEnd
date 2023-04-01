
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
db.instrumentrole = require("./instrumentrole.model.js")(sequelize, Sequelize);
db.level = require("./level.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.repertoireSong = require("./repertoireSong.model.js")(sequelize, Sequelize);
db.song = require("./song.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(db.session, { as: 'session'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.session.belongsTo(db.user, { as: 'user'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

//Role Table:
// foreign key for user
db.user.hasMany(db.role, { as: 'role'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.role.belongsTo(db.user, { as: 'user'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

// foreign key for level
db.level.hasMany(db.role, { foreignKey: { name: 'studentLevel'}, onDelete: 'CASCADE' });
db.role.belongsTo(db.level, { foreignKey: { name: 'studentLevel' }, onDelete: 'CASCADE' });

//Instrument Role Table:
// foreign key for role
db.role.hasMany(db.instrumentrole, { foreignKey: { name: 'studentId', allowNull: false}, onDelete: 'CASCADE' });
db.role.hasMany(db.instrumentrole, { foreignKey:  { name: 'privateInstructorId', allowNull: false}, onDelete: 'CASCADE' });
db.role.hasMany(db.instrumentrole, { foreignKey: { name: 'accompanistId', allowNull: false}, onDelete: 'CASCADE' });
db.instrumentrole.belongsTo(db.role, { foreignKey: { name: 'studentId', allowNull: false}, onDelete: 'CASCADE', });
db.instrumentrole.belongsTo(db.role, { foreignKey: { name: 'privateInstructorId', allowNull: false}, onDelete: 'CASCADE', });
db.instrumentrole.belongsTo(db.role, { foreignKey: { name: 'accompanistId'}, onDelete: 'CASCADE', });

// foreign key for instrument
db.instrument.hasMany(db.instrumentrole, { as: 'instrumentrole'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.instrumentrole.belongsTo(db.instrument, { as: 'instrument'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE', });

//Availability Table:
// foreign key for availability and role
db.role.hasMany(db.availability, { foreignKey: { name: 'accompanistId'}, onDelete: 'CASCADE' });
db.role.hasMany(db.availability, { foreignKey: { name: 'facultyId'}, onDelete: 'CASCADE' });
db.availability.belongsTo(db.role, { foreignKey: { name: 'accompanistId'}, onDelete: 'CASCADE' });
db.availability.belongsTo(db.role, {foreignKey: { name: 'facultyId'}, onDelete: 'CASCADE' });


// foreign key for availability and event
db.event.hasMany(db.availability, { as: 'availability' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.availability.belongsTo(db.event, { as: 'event' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

//Event Session Table:
// foreign key for event session and event 
db.event.hasMany(db.eventsession, { as: 'eventsession' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.eventsession.belongsTo(db.event, { as: 'event' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

// foreign key for event session and role
db.role.hasMany(db.eventsession, { foreignKey: { name: 'privateInstructorId', allowNull: false }, onDelete: 'CASCADE' });
db.role.hasMany(db.eventsession, { foreignKey: { name: 'accompanistId', allowNull: false }, onDelete: 'CASCADE' });
db.role.hasMany(db.eventsession, { foreignKey: { name: 'studentId', allowNull: false }, onDelete: 'CASCADE' });
db.eventsession.belongsTo(db.role, { foreignKey: { name: 'privateInstructorId', allowNull: false }, onDelete: 'CASCADE' });
db.eventsession.belongsTo(db.role, { foreignKey: { name: 'accompanistId', allowNull: false }, onDelete: 'CASCADE' });
db.eventsession.belongsTo(db.role, { foreignKey: { name: 'studentId', allowNull: false }, onDelete: 'CASCADE' });

//Critique Table:
// foreign key for event session and critique
db.eventsession.hasMany(db.critique, { as: 'critique' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.critique.belongsTo(db.eventsession, { as: 'eventsession' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

// foreign key for role and critique
db.role.hasMany(db.critique, { foreignKey: { name: 'studentId', allowNull: false }, onDelete: 'CASCADE' });
db.role.hasMany(db.critique, { foreignKey: { name: 'facultyId', allowNull: false }, onDelete: 'CASCADE' });
db.critique.belongsTo(db.role, { foreignKey: { name: 'studentId', allowNull: false }, onDelete: 'CASCADE' });
db.critique.belongsTo(db.role, { foreignKey: { name: 'facultyId', allowNull: false }, onDelete: 'CASCADE' });

//Event Song Table:
// foreign key for event session and event song
db.eventsession.hasMany(db.eventsong, { as: 'eventsong' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.eventsong.belongsTo(db.eventsession, { as: 'eventsession' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

// foreign key for repertoire song and event song
db.repertoireSong.hasMany(db.eventsong, { as: 'eventsong' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.eventsong.belongsTo(db.repertoireSong, { as: 'repertoireSong' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

//Repertoire Song Table:
// foreign key for repertoire song and role (student)
db.role.hasMany(db.repertoireSong, { foreignKey: {name: 'studentId', allowNull: false }, onDelete: 'CASCADE' });
db.repertoireSong.belongsTo(db.role, { foreignKey: { name: 'studentId', allowNull: false }, onDelete: 'CASCADE' });

// foreign key for repertoire song and event song
db.song.hasMany(db.repertoireSong, { as: 'repertoireSong' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.repertoireSong.belongsTo(db.song, { as: 'song' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

//Song Table:
// foreign key for event session and event song
db.composer.hasMany(db.song, { as: 'song' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.song.belongsTo(db.composer, { as: 'composer' }, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

module.exports = db;