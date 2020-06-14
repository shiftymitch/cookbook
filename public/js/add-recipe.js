//! Input & Button Refs
let recipeName = "";
let recipeDesc = "";
let ingQty = "";
let ingMsr = "";
let ingName = "";
let instructions = "";
let imgUploadBtn = $("input#img-upload");
let recipeSubmit = $("button#recipe-submit");
let ingRows = 1;

//! get input values, then submit
recipeSubmit.on("click", () => {
    
    title = $("input#recipe-name").val();
    description = $("textarea#recipe-description").val();
    instructions = $("textarea#instructions").val();

    if (title === "" || description === "" || instructions === "") {
        return;
    } 

    let ingredientsArr = [];

    for (let i = 0; i < ingRows; i++) {

        ingQty = $("input#ing-qty-" + i + "").val();
        ingMsr = $("select#ing-measurement-" + i + "").children("option:selected").val(),
        ingName = $("input#ing-name-" + i + "").val();

        if (ingQty === "" || ingMsr === "" || ingName === "") {
            return;
        } 

        ingredientsArr.push({
            qty: ingQty,
            measurement: ingMsr,
            name: ingName
        });

    }


    addRecipe(title, description, instructions, ingredientsArr);
})

//! send newRecipe & newIngredients on submit
function addRecipe(title, description, instructions, ingredients) {

    $.post("/api/add-recipe", {
        title: title,
        description: description,
        instructions: instructions,
        ingredients: ingredients
    })
    .then(function () {
        window.location.replace("/profile");
    })
}

$("#add-ingredient").on("click", function() {
    event.preventDefault();

    let allRows = $(".ingredient-rows");
    let newRow = `
    <div class="field columns is-grouped">
        <div class="control column">
            <label class="label is-small">Qty</label>
            <input id=ing-qty-` + ingRows + ` class="input" type="input">
        </div>
        <div class="control column">
            <label class="label is-small">Measurement</label>
            <div class="select">
            <select id=ing-measurement-` + ingRows + `>
                <option>cups</option>
                <option>lbs</option>
                <option>oz</option>
                <option>pinch</option>
                <option>pints</option>
                <option>quarts</option>
                <option>tsp</option>
                <option>tbsp</option>
            </select>
            </div>
        </div>
        <div class="control column">
            <label  class="label is-small">Ingredient Name</label>
            <input id=ing-name-`+ ingRows + ` class="input" type="input">
        </div>
        <button class="delete level-item">Delete</button>
    </div>
    `;

    allRows.append(newRow);
    ingRows++;
});

$('body').on('click', 'button.delete', function() {
    $(this).parent().remove();
});