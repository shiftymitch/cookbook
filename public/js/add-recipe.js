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
                 ingredient: ingName}
            ]
        })
        .then(() => {
            console.log("recipe added")
        })
    }
    
    $("#add-ingredient").on("click", (data) => {
        event.preventDefault();

        let allRows = $(".ingredient-rows");
        let newRow = `
        <div class="field columns is-grouped">
            <div class="control column">
                <label class="label is-small">Qty</label>
                <input class="input" type="input">
            </div>
            <div class="control column">
                <label class="label is-small">Measurement</label>
                <div class="select">
                <select id="ing-measurement">
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
                <input class="input" type="input">
            </div>
        </div>
        `;

        allRows.append(newRow);
    })


    const fileInput = document.querySelector('#image-upload input[type=file]');
    fileInput.onchange = () => {
        if (fileInput.files.length > 0) {
            const fileName = document.querySelector('#image-upload .file-name');
            fileName.textContent = fileInput.files[0].name;
        }
    }

});