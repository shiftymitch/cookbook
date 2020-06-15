$(document).ready(function () {

    //! api search query
    $("#search-button").on("click", function (event) {
        event.preventDefault();
        console.log("search button hit")
        $("#recipes-container").empty();

        let query = $("#add-search").val().trim();
        console.log(query)

        // $.post("/api/results", {
        //     query: query
        // }).then(() => {
        //     $("#add-search").val("");
        // })
        $.get(`/api/results/${query}`).then(() => {
            console.log('search submitted')
            window.location.replace(`/api/results/${query}`)
            // console.log('data', data)
            // for (let i = 0; i < 10; i++) {

            //     let image = data.baseUri + data.results[i].image;
            //     let title = "" + data.results[i].title;
            //     let mins = data.results[i].readyInMinutes;
            //     let servings = data.results[i].servings;
            //     let link = data.results[i].sourceUrl;

            //     //! recipe html object
            //     let recipe = `
            //     <article class="media box" style="height:225px">
            //         <figure class="media-left">
            //             <p class="image is-128x128">
            //                 <a href="` + link + `" target="_blank">
            //                     <img src="` + image + `" width="128px">
            //                 </a>
            //             </p>
            //         </figure>
            //         <div class="media-content">
            //             <div class="content">
            //                 <p>
            //                     <a href="` + link + `" 
            //                         <strong>` + title + `</strong>
            //                     </a>
            //                 </p>
            //                 <p>
            //                     <span>Ready in <strong>` + mins + ` mins</strong></span>
            //                 </p>
            //                 <p>
            //                     <span>Servings: <strong>` + servings + `</strong></span>
            //                 </p>
            //             </div>
            //         </div>
            //     </article>
            //     `;

            //     $("#recipes-container").append(recipe);
            // }
        });
    });
});