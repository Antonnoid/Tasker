const router = require('express').Router();
const { Task, User, Project, UserProject, CommentProject } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['createdAt', 'ASC']],
      where: { admin_id: req.session.userId },
      include: {
        model: CommentProject,
        include: { model: User },
      },
    });
    res.json(projects);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/mate', async (req, res) => {
  try {
    const projectsMate = await UserProject.findAll({
      where: { user_id: req.session.userId },
      include: {
        model: Project,
      },
    });
    const newprojectsMate = projectsMate
      .map((el) => el.Project)
      .filter((el) => el.admin_id !== req.session.userId);
    res.json(newprojectsMate);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/:projectId', async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [['createdAt', 'ASC']],
      where: { project_id: req.params.projectId },
      include: {
        model: Project,
        include: { model: UserProject, include: { model: User } },
      },
    });
    res.json(tasks);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/:projectId/tasks/:taskId', async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.taskId },
      include: {
        model: Project,
        include: { model: UserProject, include: { model: User } },
      },
    });
    res.json(task);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, deadline, project_id, userId } = req.body;
    const task = await Task.create({
      title,
      description,
      deadline,
      user_id: userId,
      project_id,
    });
    res.json(task);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/project', async (req, res) => {
  try {
    if (req.session.userId) {
      const { nameProject, addUsers } = req.body;
      const newProject = await Project.create({
        name_project: nameProject,
        admin_id: req.session.userId,
      });
      await UserProject.create({
        project_id: newProject.id,
        user_id: req.session.userId,
      });
      const arr = [...addUsers].map((el) => ({ user_id: el.id }));
      const project_id = newProject.id;
      const userProjects = arr.map((user) => ({
        ...user,
        project_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await UserProject.bulkCreate(userProjects);
      res.json(newProject);
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.delete('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const result = await Task.destroy({ where: { id: taskId } });
    if (result > 0) {
      res.json(taskId);
      return;
    }
    throw new Error();
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.delete('/:projectId/delete', async (req, res) => {
  try {
    const { projectId } = req.params;
    const result = await Project.destroy({ where: { id: projectId } });
    if (result > 0) {
      res.json(projectId);
      return;
    }
    throw new Error();
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.put('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, deadline } = req.body;
    await Task.update(
      {
        title,
        description,
        deadline,
      },
      { where: { id: taskId } }
    );
    const task = await Task.findOne({ where: { id: taskId } });
    res.json(task);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.put('/drag/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findOne({ where: { id: taskId } });
    task.status = req.body.status;
    task.save();
    res.json(task);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/:projectId/comments', async (req, res) => {
  try {
    const comments = await CommentProject.findAll({
      order: [['createdAt', 'DESC']],
      where: { projectId: req.params.projectId },
      include: {
        model: User,
      },
    });
    res.json(comments);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/:projectId/comments', async (req, res) => {
  try {
    const { projectId, message } = req.body;
    const comment = await CommentProject.create({
      projectId,
      userId: req.session.userId,
      message,
    });
    res.json(comment);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete('/:projectId/del', async (req, res) => {
  try {
    const { projectId } = req.params;
    const result = await CommentProject.destroy({
      where: { id: projectId },
    });
    if (result > 0) {
      res.json(projectId);
      return;
    }
    throw new Error();
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
