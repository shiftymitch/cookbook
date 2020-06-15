$(document).ready(function () {

  getSpoonRecipe()

  // Get random recipes from 3rd party API and use data for homepage
  function getSpoonRecipe() {
    $.get("/api/spoon-recipe/:id").then(function (data) {

      $("#recipe-page-ingredient-list").empty();
      $("#date-line").remove();
      $("#recipe-page-instructions").nextAll().remove();

      $("#recipe-page-name").text(data.title);
      $("#recipe-page-description").html(data.summary);
      $("#recipe-page-picture").attr({
        src: data.image,
        alt: data.title
      });

      let cookingSteps = data.analyzedInstructions[0].steps

      for (i = 0; i < cookingSteps.length; i++) {
        let stepNumber = data.analyzedInstructions[0].steps[i].number
        let stepText = data.analyzedInstructions[0].steps[i].step

        let nextInstruction = `<p class="is-size-6">${stepNumber}. ${stepText}</p>`
        $("#recipe-page-instructions").append(nextInstruction)

      }

      for (i = 0; i < data.extendedIngredients.length; i++) {
        let ingredient = data.extendedIngredients[i].original

        let nextIngredient = `<li>
        <p>${ingredient}</p>
        </li>`
        $("#recipe-page-ingredient-list").append(nextIngredient)

      }
    })

  }
});