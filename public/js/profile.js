const dbSearchBtn = document.getElementById("db-search-btn");
const dbSearchInput = document.getElementById("db-search");

dbSearchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("DB Search Btn Hit");
    const dbSearchValue = dbSearchInput.value.trim();
    console.log(dbSearchValue)

    fetch(`/api/search-results/${dbSearchValue}`)
        .then(() => {
            window.location.replace(`/search-results/${dbSearchValue}`);
        })
        .catch(err => console.log(err))
});