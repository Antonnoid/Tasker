'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'CommentProjects',
      [
        {
          projectId: 1,
          userId: 1,
          message: 'Предстоящие собрание',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 1,
          userId: 1,
          message: 'Закончил задачу',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 2,
          userId: 1,
          message: 'Когда мне будет задача?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 1,
          userId: 2,
          message: 'Сколько еще будем работать?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CommentProjects', null, {});
  },
};
