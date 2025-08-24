'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Kos dimiliki oleh satu user
      Kos.belongsTo(models.User, { foreignKey: 'ownerId' });

      // Kos memiliki banyak fasilitas melalui pivot table
      Kos.belongsToMany(models.Facility, {
        through: models.KosFacility,
        foreignKey: 'kosId',
        otherKey: 'facilityId'
      });
    }
  }
  Kos.init({
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    type: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Kos',
  });
  return Kos;
};