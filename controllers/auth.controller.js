const { Router } = require('express');
const { User } = require('../models');

const router = Router();

router.post('/api/user', (req, res) => {
  const { Users } = req.body;
  if (!Users || !Users.length) res.status(401).json({ success: false, message: 'No users sent' })

  const promises = Users.map(async user => {
    await User.create({
      email: user,
    })
  });

  Promise.all(promises)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: 'Problem when creating user', error: err });
    })
})

router.get('/api/user', (req, res) => {
  User.findAll({ include: User.Task })
    .then(users => res.json({ users }))
    .catch(console.error);
})

router.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log({ body: req.body });
  User.findOne({ where: { email } })
    .then((user) => {
      console.log({ user });
      if (!user) {
        return res.json({ message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return res.json({ message: 'Incorrect password.' });
      }
      return res.json({ user: user.email });
    });
})

module.exports = router;