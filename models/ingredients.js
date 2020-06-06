module.exports = function (sequelize, DataTypes) {
  const Ingredient = sequelize.define("Ingredient", {
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [1, 255]
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [1, 4]
      }
    },
    measurement: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [1, 30]
      }
    }
  });

  Ingredient.associate = function (models) {
    Ingredient.belongsTo(models.Recipes, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Ingredient;
};