$(document).ready(function () {

  getRandomRecipe()

  $(".spoon-recipe-name").click(function () {
    $.post("/api/spoon-recipe/:id", {
      spoonID: $(this).attr("data-id")
    })
  })

  // Get random recipes from 3rd party API and use data for homepage
  function getRandomRecipe() {
    $.get("/api/random-recipe").then(function (data) {
      console.log(data.recipes)
      $("#random-recipe-one-name").text(data.recipes[0].title);

      $("#random-recipe-one-name").attr({
        href: `/spoon-recipe/${data.recipes[0].id}`,
        "data-id": data.recipes[0].id,
        target: "_blank"
      });

      $("#random-recipe-one-img").attr({
        src: data.recipes[0].image,
        alt: data.recipes[0].title
      });

      $("#random-recipe-one-summary").html(data.recipes[0].summary.replace(/^(.{300}[^\s]*).*/, "$1") + "...");

      $("#random-recipe-two-name").text(data.recipes[1].title);

      $("#random-recipe-two-name").attr({
        href: `/spoon-recipe/${data.recipes[1].id}`,
        "data-id": data.recipes[1].id,
        target: "_blank"
      });

      $("#random-recipe-two-img").attr({
        src: data.recipes[1].image,
        alt: data.recipes[1].title
      });

      $("#random-recipe-two-summary").html(data.recipes[1].summary.replace(/^(.{300}[^\s]*).*/, "$1") + "...");
    }).then(() => {
      $("#random-box-one").addClass("box");

      $("#random-box-two").addClass("box");
    });

  };

});