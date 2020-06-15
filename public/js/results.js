$(document).ready(function () {

    //! api search query
    $("#search-button").on("click", function (event) {
        event.preventDefault();
        $("#recipes-container").empty();

        let query = $("#add-search").val().trim();

        $.get(`/api/results/${query}`).then(() => {
            window.location.replace(`/api/results/${query}`)
        });
    });
});