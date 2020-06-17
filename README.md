# Cookbook

[![Build Status](https://travis-ci.org/shiftymitch/cookbook.svg?branch=master)](https://travis-ci.org/shiftymitch/cookbook)

![cookbook-screenshot](https://user-images.githubusercontent.com/4752937/84712609-3cafe580-af26-11ea-8364-01512cd9cfe3.png)

---

### Table of Contents

Your section headers will be used to reference location of destination.

- [Description](#description)
- [How to Use](#how-to-use)
- [Installation](#installation)
- [Technologies](#technologies)
- [Roadmap](#roadmap)
- [Code Samples](#code-samples)
- [License](#license)
- [Contributors](#contributors)

---

### Description

Cookbook is a community driven recipe database, which gives users the ability to sign-up, submit recipes, search for community recipes, and search a larger 3rd party database.

Cookbook skips the unnecessary and presents straight-forward recipes, including name, photo, ingredients, and instructions. No filler, no life-story needed.

Our app is purpose-built from recipe submission to display to provide only the information you need to go from grocery store to kitchen.

---

## How to Use

Simply open the application in any browser. Once the page is loaded, signup, login, and begin adding and searching for recipes. Cookbook is community-driven, so why not share your favorite recipes!

---

#### Installation

Cookbook is live [here](https://the-cookbook-app.herokuapp.com/)

---

#### Technologies

[Axios](https://www.npmjs.com/package/axios)\
[Bulma](https://bulma.io/)\
[dotenv](https://www.npmjs.com/package/dotenv)\
[Express](https://expressjs.com/)\
[Handlebars](https://handlebarsjs.com/)\
[Moment.js](https://momentjs.com/)\
[multer](https://www.npmjs.com/package/multer)\
[MySQL](https://www.mysql.com/)\
[Node.js](https://nodejs.org/en/)\
[Passport.js](http://www.passportjs.org/)\
[Sequelize](https://sequelize.org/)\
[spoonacular API](https://spoonacular.com/food-api)

---

### Roadmap

Future improvements for the application:
- Users can edit or delete their recipes
- Users can favorite a recipe to easily access from their profile
- Smoother page load when executing/utilizing API calls

---

#### Code Samples

Routes returning a user recipe or spoonacular API random recipes:

```javascript
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
```

```javascript
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
```

---

### License

MIT © [shiftymitch](https://github.com/shiftymitch), [nvalline](https://github.com/nvalline), [nabeek](https://github.com/nabeek)

---

### Contributors

| Developer | GitHub |
| ------ | ------ |
| Mitch Henderson | [shiftymitch](https://github.com/shiftymitch) |
| Nate Valline | [nvalline](https://github.com/nvalline) |
| Nick Beekhuizen | [nabeek](https://github.com/nabeek) |

[Back to the Top](#project-name)
