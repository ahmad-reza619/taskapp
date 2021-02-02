const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`postgres://${process.env.username}:${process.env.password}@localhost:5432/${process.env.dbName}`, {
  logging: false,
});

module.exports = sequelize;