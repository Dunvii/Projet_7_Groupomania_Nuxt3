'use strict';
const bcrypt = require('bcrypt');
const { User } = require('../models');
const fs = require('fs');
const path = require('path');
const Sequelize = require('@sequelize/core');
const process = require('process');
const basename = path.basename(__filename);
const dotenv = require("dotenv");
dotenv.config();
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync()
  .then(async ()=> {
    const searchAdmin = await db.User.findOne({
      where: {
        admin: true,
      }
    });
    if (!searchAdmin){
      bcrypt.hash(process.env.PASSWORDADMIN,10).then((hash) => {
        db.User.create({
          email: process.env.EMAILADMIN,
          password: hash,
          admin: true,
        });
      })
    }
  })
  .catch((error) => console.log(error));

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize.sync({ alter : true });

module.exports = db;
