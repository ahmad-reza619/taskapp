const { Model, DataTypes } = require('sequelize');
const db = require('./db');
const bcrypt = require('bcrypt');

class User extends Model {
  validPassword(password) {
    console.log({ password, p : this.password })
    if (!this.password) return false;
    const isValid = bcrypt.compareSync(password, this.password);
    return isValid && this.isAdmin;
  }
}

User.init({
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize: db,
  modelName: 'User',
});

module.exports = User;