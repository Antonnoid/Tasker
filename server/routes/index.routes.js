const express = require('express');

const router = express.Router();

const tasksApiRouter = require('./api/tasks.routes');
const authApiRouter = require('./api/auth.routes');
const usersApiRouter = require('./api/users.routes');

router.use('/api/tasks', tasksApiRouter);
router.use('/api/auth', authApiRouter);
router.use('/api/users', usersApiRouter);

module.exports = router;
