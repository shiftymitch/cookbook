// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {

        //username
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true
            }
        },

        //password
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // password validation
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    // password hashing
    User.addHook("beforeCreate", user => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });

    // Recipe/User association
    User.associate = function(models) {
        User.hasMany(models.Recipe, {
          onDelete: "cascade"
        });
      };

    return User;
};
