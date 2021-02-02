const { db, User } = require('./models');
const bcrypt = require('bcrypt');

db.sync({ force: true })
  .then(() => {
    const pass = bcrypt.hashSync('admin', 10);
    return User.create({
      email: 'admin@admin.com',
      password: pass,
      isAdmin: true,
    })
  })
  .then(() => console.log('Migration finished'))
  .catch(console.error);
