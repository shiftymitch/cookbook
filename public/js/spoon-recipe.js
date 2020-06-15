$(document).ready(function () {

  getSpoonRecipe()

  // Get random recipes from 3rd party API and use data for homepage
  function getSpoonRecipe() {
    $.get("/api/spoon-recipe/:id").then(function (data) {
      console.log(data)

      $("#ingredient-list").empty();
      $("#date-line").remove();
      $("#recipe-instructions").nextAll().remove();

      $("#recipe-name").text(data.title);
      $("#recipe-description").html(data.summary);
      $("#recipe-picture").attr({
        src: data.image,
        alt: data.title
      });

      let cookingSteps = data.analyzedInstructions[0].steps

      for (i = 0; i < cookingSteps.length; i++) {
        let stepNumber = data.analyzedInstructions[0].steps[i].number
        let stepText = data.analyzedInstructions[0].steps[i].step

        let nextInstruction = `<p class="is-size-6">${stepNumber}. ${stepText}</p>`
        $("#recipe-instructions").append(nextInstruction)

      }

      for (i = 0; i < data.extendedIngredients.length; i++) {
        let ingredient = data.extendedIngredients[i].original

        let nextIngredient = `<li>
        <p>${ingredient}</p>
        </li>`
        $("#ingredient-list").append(nextIngredient)

      }
    })

  }
});