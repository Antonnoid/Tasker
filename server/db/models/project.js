const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate({ UserProject, Task, User, CommentProject }) {
      this.hasMany(UserProject, { foreignKey: 'project_id' });
      this.hasMany(Task, { foreignKey: 'project_id' });
      this.hasMany(CommentProject, { foreignKey: 'projectId' });
      this.belongsTo(User, { foreignKey: 'admin_id' });
    }
  }
  Project.init(
    {
      name_project: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Project',
    }
  );
  return Project;
};
