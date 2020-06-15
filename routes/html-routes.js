// Requiring path to so we can use relative routes to our HTML files
const db = require("../models");
const moment = require("moment");
const { Sequelize } = require("../models");
const Op = Sequelize.Op;

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/profile");
      return
    }
    res.render("signup");
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/profile");
      return
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/profile", isAuthenticated, function (req, res) {
    db.Recipe.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function (dbRecipe) {

      let hbsObject = {
        recipe: dbRecipe.map(recipe => {
          return {
            id: recipe.id,
            title: recipe.title,
            description: recipe.description,
            createdAt: () => {
              return recipe.createdAt = moment().format("MMM Do YYYY");
            }
          }
        })
      };

      if (hbsObject.recipe.length === 0) {
        hbsObject = {
          recipe: {
            noRecipe: true
          }
        }
      }

      res.render("profile", {
        recipe: hbsObject.recipe
      });
    })
  });

  app.get("/add-recipe", isAuthenticated, function (req, res) {
    res.render("add-recipe");
  });

  // Display search results
  app.get("/search-results/:searchTerm", isAuthenticated, function (req, res) {
    const searchTerm = req.params.searchTerm;

    db.Recipe.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${searchTerm}%` } },
          { description: { [Op.like]: `%${searchTerm}%` } }
        ]
      }
    })
      .then((dbResults) => {
        let hbsObject = {
          recipe: dbResults.map(recipe => {
            return {
              id: recipe.id,
              title: recipe.title,
              description: recipe.description,
              createdAt: () => {
                return recipe.createdAt = moment().format("MMM Do YYYY");
              }
            }
          })
        };

        if (hbsObject.recipe.length === 0) {
          hbsObject = {
            recipe: {
              noRecipe: true
            }
          }
        }

        res.render("search-results", {
          recipe: hbsObject.recipe
        });
      })
      .catch(err => {
        console.log(err)
      })
  });

  app.get("/spoon-recipe/:id", function (req, res) {
    res.render("recipe");
  });

  app.get("/recipe/:id", function (req, res) {
    const searchId = req.params.id;

    db.Recipe.findOne({
      where: { id: searchId },
      include: db.Ingredient
    })
      .then((dbResult) => {
        console.log(dbResult.dataValues)
        const recipe = dbResult.dataValues;
        let hbsObject = {
          recipe: {
            id: recipe.id,
            title: recipe.title,
            description: recipe.description,
            instructions: recipe.instructions,
            createdAt: () => {
              return recipe.createdAt = moment().format("MMM Do YYYY");
            },
            ingredients: recipe.Ingredients.map(ingredient => {
              return {
                name: ingredient.name,
                qty: ingredient.qty,
                measurement: ingredient.measurement
              }
            })
          }
        };

        res.render("recipe", {
          recipe: hbsObject.recipe
        })
      })
      .catch(err => console.log(err))
  });
};
