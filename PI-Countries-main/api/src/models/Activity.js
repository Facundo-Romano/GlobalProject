const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {
  sequelize.define('Activity', {
      name: {
          type: DataTypes.STRING
      },
      difficulty: {
          type: DataTypes.INTEGER
      },
      duration: {
          type: DataTypes.INTEGER
      },
      season: {
          type: DataTypes.STRING
      },
      img: {
          type: DataTypes.STRING
      }
  }, {
    timestamps: false
  });
};