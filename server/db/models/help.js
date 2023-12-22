const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Help extends Model {
    static associate({ Comment, Task, User }) {
      this.hasMany(Comment, { foreignKey: 'help_id' });
      this.belongsTo(Task, { foreignKey: 'task_id' });
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Help.init(
    {
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '0',
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Tasks', key: 'id' },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Help',
    }
  );
  return Help;
};
