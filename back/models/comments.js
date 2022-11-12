'use strict';
const {
  Model
} = require('@sequelize/core');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      // this.belongsTo(User, { targetKey: 'uuid', foreignKey: 'userId'})
    }

  }
  comments.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    timestamps: true,
    tableName: 'comments',
    modelName: 'Comment',
  });
  return comments;
};