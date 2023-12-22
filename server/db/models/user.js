const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ UserProject, Project, Task, Comment, CommentProject }) {
      this.hasMany(UserProject, { foreignKey: 'user_id' });
      this.hasMany(Project, { foreignKey: 'admin_id' });
      this.hasMany(Task, { foreignKey: 'user_id' });
      this.hasMany(Comment, { foreignKey: 'user_id' });
      this.hasMany(CommentProject, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      photo: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'https://i.pinimg.com/236x/b5/f1/49/b5f1492497affd86d16eab516edd266c--programming-software.jpg',
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
