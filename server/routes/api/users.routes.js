const router = require('express').Router();
const { User, UserProject, Project, Task } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: UserProject,
        },
        {
          model: Project,
        },
        {
          model: Task,
        },
      ],
    });
    res.json(users);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await UserProject.destroy({ where: { user_id: userId } });
    if (users) {
      res.json({ message: 'success' });
      return;
    }
    res.json({ message: 'error' });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await UserProject.create({ where: { user_id: userId } });
    const user = await User.findOne({ where: { user_id: userId } });
    res.json(user);
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
