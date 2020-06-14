// Dependencies
require("dotenv").config();
const axios = require("axios")
const db = require("../models");
const moment = require("moment");
const passport = require("../config/passport");
const { Sequelize } = require("../models");
const Op = Sequelize.Op;

module.exports = function (app) {

  //! login
  app.post("/api/login", passport.authenticate("local"), function (req, res) {

    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  //! signup
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  //! logout
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  //! user_data
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //! add-recipe
  app.post("/api/add-recipe", function (req, res) {
    console.log("req.user", req.body);

    db.Recipe.create({
      title: req.body.title,
      description: req.body.description,
      instructions: req.body.instructions,
      UserId: req.user.id
    })

      .then(function (data) {

        let Array = [];

        for (let i = 0; i < req.body.ingredients.length; i++) {

          let qty = req.body.ingredients[i].qty;
          let measurement = req.body.ingredients[i].measurement;
          let name = req.body.ingredients[i].name;

          Array.push({
            qty: qty,
            measurement: measurement,
            name: name,
            RecipeId: data.dataValues.id
          })
        }

        db.Ingredient.bulkCreate(Array);

      }).then((data) => {
        res.sendStatus(200);
      })
      .catch(function (err) {
        console.log({ err });
        res.status(401).json(err);
      });
  });

  // Query 3rd party API and produce random recipe

  app.get("/api/random-recipe", function (req, res) {

    let keys = [process.env.SPOON_API_KEY_1, process.env.SPOON_API_KEY_2, process.env.SPOON_API_KEY_3, process.env.SPOON_API_KEY_4]
    let key = keys[Math.floor(Math.random() * keys.length)]

    axios.get("https://api.spoonacular.com/recipes/random?number=2&tags=dinner&apiKey=" + key)
      .then((response) => {
        res.send(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  });

  // DB Search Route from Profile Page
  app.post("/api/db_search", (req, res) => {
    const searchTerm = req.body.dbSearchTerm;
    console.log(searchTerm)

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

        console.log(hbsObject.recipe)

        res.render("search-results", {
          recipe: hbsObject.recipe
        });
      })
      .catch(err => {
        console.log(err)
      })
  });
};
