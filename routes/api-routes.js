// Dependencies
require("dotenv").config();
const axios = require("axios")
const db = require("../models");
const passport = require("../config/passport");

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

    db.Recipe.create({
      title: req.body.title,
      description: req.body.description,
      instructions: req.body.instructions,
      UserId: req.user.id
    })

    .then(function (data) {
      
      let Array = [];
      
      for (let i = 0; i < req.body.ingredients.length; i++ ) {
        
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

    }).then(() => {
      res.sendStatus(200);
    })
    .catch(function (err) {
      console.log({err});
      res.status(401).json(err);
    });
  });

  // Query 3rd party API and produce random recipe

  app.get("/api/random-recipe", function (req, res) {

    let keys = [process.env.SPOON_API_KEY_1, process.env.SPOON_API_KEY_2, process.env.SPOON_API_KEY_3, process.env.SPOON_API_KEY_4];
    
    let key = keys[Math.floor(Math.random() * keys.length)];

    axios.get("https://api.spoonacular.com/recipes/random?number=2&tags=dinner&apiKey=" + key)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

  });

  //! api search-results query
  let query = "";
  app.post("/api/search-results", function (req, res) {
    query = req.body.query;
  });

  app.get("/api/search-results", function (req, res) {
    let keys = [process.env.SPOON_API_KEY_1, process.env.SPOON_API_KEY_2, process.env.SPOON_API_KEY_3, process.env.SPOON_API_KEY_4];

    let key = keys[Math.floor(Math.random() * keys.length)];

    axios.get("https://api.spoonacular.com/recipes/search?query=" + query + "&number=3&apiKey=" + key)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

  });
};
