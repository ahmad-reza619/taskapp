const { Router } = require('express');
const { Op } = require('sequelize');
const { User, Task } = require('../models');
const router = Router();

router.post('/api/assign', (req, res) => {
  const { user, tasks } = req.body;
  User.findOne({ where: { email: user } })
    .then(user => {
      console.log('tes')
      return Task.bulkCreate(tasks.map(task => ({
        name: task,
        completed: false,
        UserId: user.id,
      })));
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    })
});

router.put('/api/task/:id', (req, res) => {
  const { user, name, completed } = req.body;
  const { id } = req.params;

  if (!user) res.redirect('/login');

  Task.findOne({ where: { id } })
    .then(task => {
      task.name = name;
      task.completed = completed;
      task.save().then(() => res.json({ success: true }));
    })
})

router.get('/api/task/common', (req, res) => {
  const user = JSON.parse(req.query.user);
  if (user.length === 0 ) {
    return res.json({ task: [] })
  }
  User.findAll({ where: {
    [Op.or]: user.map(u => ({ email: u })),
  } })
    .then(users => {
      console.log({ users });
      Task.findAll({
        where: {
          [Op.or]: users.map(u => ({ UserId: u.id })),
        }
      }).then(tasks => {
        const lookup = tasks.reduce((a, e) => {
          a[e.name] = ++a[e.name] || 0;
          return a;
        }, {});
        console.log({ tasks, lookup });
        const similarValue = tasks.filter(task => lookup[task.name]);
        res.json({ task: similarValue });
      })
    });
})

router.delete('/api/task/:id', (req, res) => {
  const { user } = req.body;
  const { id } = req.params;
  if (!user) {
    res.redirect('/login');
  }

  Task.destroy({ where: { id } })
    .then(() => {
      res.json({ success: true });
    })
    .catch(() => {
      res.json({ success: false, message: 'Server error' })
    });
})

module.exports = router;