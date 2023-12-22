'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Projects',
      [
        {
          name_project: 'main',
          admin_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_project: 'first',
          admin_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_project: 'second',
          admin_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Projects', null, {});
  },
};
