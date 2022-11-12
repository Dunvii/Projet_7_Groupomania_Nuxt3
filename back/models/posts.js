'use strict';
require('dotenv').config()
const {
  Model
} = require('@sequelize/core');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment }) {
      // define association here
    }

  }
  posts.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    usersLiked: {
      type: DataTypes.JSON,
      allowNull: true,
    }
    }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });
  return posts;
};