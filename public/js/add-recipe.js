$(document).ready(function () {

    //! Input & Button Refs
    let recipeName = "";
    let recipeDesc = "";
    let ingQty = "";
    let ingMsr = "";
    let ingName = "";
    let instructions = "";
    let imgUploadBtn = $("input#img-upload");
    let recipeSubmit = $("button#recipe-submit");
    
    //! get input values, then submit
    recipeSubmit.on("click", () => {

        recipeName = $("input#recipe-name").val();
        recipeDesc = $("textarea#recipe-description").val();
        instructions = $("textarea#instructions").val();
        ingQty = $("input#ing-qty").val();
        ingMsr = $("select#ing-measurement").children("option:selected").val(),
        ingName = $("input#ing-name").val();

        if (recipeName === "" || recipeDesc === "" || ingQty === "" || ingName === "" || instructions === "") {
            return;
        } 

        addRecipe(recipeName, recipeDesc, instructions, ingQty, ingMsr, ingName);
        // addIngredients(ingQty, ingMsr, ingName);
        
        // clear form inputs
        $("input#recipe-name").val("");
        $("textarea#recipe-description").val("");
        $("textarea#instructions").val("");
        $("input#ing-qty").val("");
        $("input#ing-name").val("");
    })

    //! send newRecipe & newIngredients on submit
    function addRecipe(title, description, instructions, ingQty, ingMsr, ingName) {

        $.post("/api/add-recipe", {
            title: title,
            description: description,
            instructions: instructions,
            ingredients: [
                { qty: ingQty,
                 measurement: ingMsr,
                 ingredient: ingName},

            ]
        })
        .then(() => {
            console.log("recipe added")
        })
    }
    
    function addIngredients(qty, measurement, ingredient) {
        $.post("/api/add-ingredient", {
            qty: qty,
            measurement: measurement,
            ingredient: ingredient
        })
        .then(() => {
            res.redirect(307, "/profile");
        })
        .catch();
    }
});