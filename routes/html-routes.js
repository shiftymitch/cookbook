// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");
const moment = require("moment");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    if (req.user) {
      res.redirect("/profile");
      return;
    }
    res.render("index");
  });

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/profile");
      return;
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
      },
      include: [db.Image]
    }).then(function (dbRecipe) {

      let hbsObject = {
        recipe: dbRecipe.map(recipe => {
          return {
            title: recipe.title,
            description: recipe.description,
            createdAt: () => {
              return recipe.createdAt = moment().format("MMM Do YYYY");
            },
            image: `/img/avatars/${Math.floor(Math.random() * 10 +1)}.png`
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

  // serve recipe page 
  app.get("/recipe", function (req, res) {
    res.render("recipe");
  });

  app.get("/add-recipe", isAuthenticated, function (req, res) {
    res.render("add-recipe");
  });

  // Display search results
  app.get("/search-results", isAuthenticated, function (req, res) {
    res.render("search-results")
  });
};
