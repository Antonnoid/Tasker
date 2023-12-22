'use strict';
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Tima',
          email: 'a@a',
          password: await bcrypt.hash('1234', 5),
          photo: 'https://blob.sololearn.com/avatars/6c6e373e-5a48-4186-a7e6-38ee2a725acb.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Garry',
          email: 'y@y',
          password: await bcrypt.hash('1234', 5),
          photo: 'https://i.ytimg.com/vi/0RKZ7HjomLQ/hqdefault.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Maks',
          email: 'm@m',
          password: await bcrypt.hash('1234', 5),
          photo: 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Lily',
          email: 'l@l',
          password: await bcrypt.hash('1234', 5),
          photo: 'https://w7.pngwing.com/pngs/555/703/png-transparent-computer-icons-avatar-woman-user-avatar-face-heroes-service-thumbnail.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jakky',
          email: 'j@j',
          password: await bcrypt.hash('1234', 5),
          photo: 'https://robocontest.uz/storage/uploads/profile/nidl9t0OFaeJ6VuDIPqU.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Anatoly',
          email: 't@t',
          password: await bcrypt.hash('1234', 5),
          photo: 'https://img.freepik.com/premium-vector/security_24877-33307.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Martin',
          email: 'r@r',
          password: await bcrypt.hash('1234', 5),
          photo: 'https://cdn-edge.kwork.ru/pics/t3/36/827439-1548866436.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Victor',
          email: 'v@v',
          password: await bcrypt.hash('1234', 5),
          photo: 'https://w7.pngwing.com/pngs/312/283/png-transparent-man-s-face-avatar-computer-icons-user-profile-business-user-avatar-blue-face-heroes-thumbnail.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gector',
          email: 'g@g',
          password: await bcrypt.hash('1234', 5),
          photo: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Nevsky',
          email: 'n@n',
          password: await bcrypt.hash('1234', 5),
          photo: 'https://w7.pngwing.com/pngs/427/153/png-transparent-computer-icons-business-user-company-young-miscellaneous-child-face-thumbnail.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Alex',
          email: 'i@i',
          password: await bcrypt.hash('1234', 5),
          photo: 'https://w7.pngwing.com/pngs/481/915/png-transparent-computer-icons-user-avatar-woman-avatar-computer-business-conversation-thumbnail.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Alina',
          email: 'e@e',
          password: await bcrypt.hash('1234', 5),
          photo: 'https://w7.pngwing.com/pngs/122/453/png-transparent-computer-icons-user-profile-avatar-female-profile-heroes-head-woman-thumbnail.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Nicolos',
          email: 'c@c',
          password: await bcrypt.hash('1234', 5),
          photo: 'https://image.shutterstock.com/image-vector/muslim-vector-icon-260nw-485938513.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Aleksa',
          email: 'k@k',
          password: await bcrypt.hash('1234', 5),
          photo: 'https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon-thumbnail.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
