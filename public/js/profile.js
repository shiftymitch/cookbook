const dbSearchBtn = document.getElementById("db-search-btn");
const dbSearchInput = document.getElementById("db-search");

dbSearchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("DB Search Btn Hit");
    const dbSearchValue = { "dbSearchTerm": dbSearchInput.value.trim() };
    console.log(dbSearchValue)

    fetch("/api/db_search", { method: "POST", body: JSON.stringify(dbSearchValue), headers: { 'Content-Type': 'application/json' } })
        .then(() => {
            console.log("Search Submitted")
            window.location.replace(`/search-results`);
        })
        .catch(err => console.log(err))
});