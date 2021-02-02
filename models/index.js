const db = require('./db');
const userModel = require('./user.model');
const taskModel = require('./task.model');

// Relationships
userModel.Task = userModel.hasMany(taskModel);
taskModel.User = taskModel.belongsTo(userModel);

// Reexports everything
module.exports = {
  db,
  User: userModel,
  Task: taskModel,
}
