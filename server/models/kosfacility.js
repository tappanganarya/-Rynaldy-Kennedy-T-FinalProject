'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KosFacility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Pivot table menghubungkan Kos dan Facility
      KosFacility.belongsTo(models.Kos, { foreignKey: 'kosId' });
      KosFacility.belongsTo(models.Facility, { foreignKey: 'facilityId' });

    }
  }
  KosFacility.init({
    kosId: DataTypes.INTEGER,
    facilityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'KosFacility',
  });
  return KosFacility;
};