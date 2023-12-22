'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CommentProject extends Model {
    static associate({ Project, User }) {
      this.belongsTo(Project, { foreignKey: 'projectId' });
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  CommentProject.init(
    {
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CommentProject',
    }
  );
  return CommentProject;
};
