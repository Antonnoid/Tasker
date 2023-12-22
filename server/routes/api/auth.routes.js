const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');

const { User } = require('../../db/models');

router.post('/registration', async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;
    let user = await User.findOne({ where: { email } });
    if (!name || !email || !password || !cpassword) {
      res.status(400).json({ message: 'Заполните все поля' });
      return;
    }
    if (user) {
      res.status(400).json({ message: 'Такой емайл уже занят' });
      return;
    }
    if (password !== cpassword) {
      res.status(400).json({ message: 'Пароли не совпадают' });
      return;
    }
    const hash = await bcrypt.hash(password, 5);
    user = await User.create({ name, email, password: hash });
    req.session.userId = user.id;
    res.status(200).json(user);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/authorization', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } })
    if (!email || !password) {
      res.status(400).json({ message: 'Заполните все поля' });
      return;
    }
    if (!user) {
      res.status(400).json({ message: 'Такого юзера не существует' });
      return;
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!user || !compare) {
      res.status(400).json({ message: 'Пароль неверный' });
      return;
    }
    req.session.userId = user.id;
    res.status(200).json(user);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'Ошибка при удалении сессии' });
    }

    res
      .clearCookie('user_sid')
      .redirect('/');
  });
});

router.get('/check', async (req, res) => {
  try {
    const { userId } = req.session;
    if (userId) {
      const user = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });
      res.status(201).json(user);
    } else {
      res.end();
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});
module.exports = router;
