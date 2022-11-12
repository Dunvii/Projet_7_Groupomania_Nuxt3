'use strict';
const {
  Model
} = require('@sequelize/core');
module.exports = (sequelize, DataTypes) => {
  class reactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
      // define association here
    }

  }
  reactions.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    }, {
    sequelize,
    tableName: 'reactions',
    modelName: 'Reaction',
  });
  return reactions;
};