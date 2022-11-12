'use strict';
const {
  Model
} = require('@sequelize/core');;
module.exports = (sequelize, DataTypes) => {
  class logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  logs.init({
    body: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'logs',
  });
  return logs;
};