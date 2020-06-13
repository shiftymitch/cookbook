$(document).ready(function () {

  getRandomRecipe()

  //! send newRecipe & newIngredients on submit
  function getRandomRecipe() {
    $.get("/api/random-recipe").then(function (data) {
      // console.log(data.recipes)
      $("#random-recipe-one-name").text(data.recipes[0].title);
      $("#random-recipe-one-img").attr({
        src: data.recipes[0].image,
        alt: data.recipes[0].title
      });
      $("#random-recipe-one-summary").html(data.recipes[0].summary.substr(0, 250));


      $("#random-recipe-two-name").text(data.recipes[1].title);
      $("#random-recipe-two-img").attr({
        src: data.recipes[1].image,
        alt: data.recipes[1].title
      });
      $("#random-recipe-two-summary").html(data.recipes[1].summary.substr(0, 250));
    });
  }

});