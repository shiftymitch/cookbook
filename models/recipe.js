module.exports = function (sequelize, DataTypes) {
    const Recipe = sequelize.define("Recipe", {
        
        // description
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        
        // title
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                len: [1, 255]
            }
        },

        // instructions
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    // Recipe/User association
    Recipe.associate = function(models) {
        Recipe.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Recipe;
};