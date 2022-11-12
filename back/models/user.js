'use strict';
const {
  Model
} = require('@sequelize/core');
require('dotenv').config();
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, User, Comment, Reaction }) {
      // define association here
      User.hasMany(Post) 
      User.hasMany(Comment)
      User.hasMany(Reaction)
      Post.hasMany(Comment)
      Post.hasMany(Reaction)
      Post.belongsTo(User)
      Comment.belongsTo(Post)
      Comment.belongsTo(User)
      Reaction.belongsTo(Post)
      Reaction.belongsTo(User)
    }

    toJSON(){
       return { ...this.get(), id: undefined }
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: process.env.DEFAULT_AVATAR,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /(^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[\.][a-z]+$)/mg,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};