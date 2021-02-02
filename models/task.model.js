const { Model, DataTypes } = require('sequelize');
const db = require('./db');

class Task extends Model {}

Task.init({
  name: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'Task',
});

module.exports = Task;