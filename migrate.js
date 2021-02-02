const { db, User } = require('./models');

db.sync({ force: true })
  .then(() => {
    return User.create({
      email: 'admin@admin.com',
      password: 'admin',
      isAdmin: true,
    })
  })
  .then(() => console.log('Migration finished'))
  .catch(console.error);
