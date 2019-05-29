const sequelize = require('sequelize');
const config = require('./config.js');

// connect to database
const db = new sequelize({ username: config.username,
						   password: config.password,
						   database: config.database,
						   host:	 config.host,
						   dialect:  'mysql',
						   define: {
						     timestamps: false
						   },
						   pool: {
						     max: 100,
						     min: 0,
						     acquire: 2000,
						     idle: 2000
						   }
						});
						
// authenticate and log
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const ballot = db.define('ballot', {
	id: {
		type: sequelize.INTEGER,
		primaryKey: true,
		validate: {
			unique: true
		}
	},
	question: {
		type: sequelize.STRING,
		allowNull: false
	},
	multipleChoices: {
		type: sequelize.BOOLEAN,
		allowNull: false
	}
});

const choice = db.define('choice', {
	id: {
		type: sequelize.INTEGER,
		primaryKey: true,
		validate: {
			unique: true
		}
	},
	ballotId: {
		type: sequelize.INTEGER,
        allowNull: false
	},
	text: {
		type: sequelize.STRING,
		allowNull: false
	},
	votes: {
		type: sequelize.INTEGER,
        allowNull: false
	}
});


module.exports = { ballot, choice };