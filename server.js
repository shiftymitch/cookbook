const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");

// require passport as configured
const passport = require("./config/passport");

// Set up PORT and require models directory
const PORT = process.env.PORT || 3000;
const db = require("./models");

// Create express app and middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set Handlebars as the default template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Utilize sessions to keep track of the user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Require our routes
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// Sync the database and start server
db.sequelize.sync({force: true}).then(function () {
    app.listen(PORT, () => {
        console.log(`Listening on PORT: ${PORT}`);
    })
});

