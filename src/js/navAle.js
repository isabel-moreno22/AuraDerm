// -------- hamburguer menu-------
function showSidebear(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'

}

// -----desvanecer el search-------

document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.querySelector(".content-icon-search");
    const searchInput = document.querySelector(".search input");
    let timeout;

    const setInputVisibility = () => {
        clearTimeout(timeout);
        if (searchInput.value.trim() === "") {
            timeout = setTimeout(() => {
                searchInput.style.display = "none";
            }, 3000);
        }
    };

    searchIcon.addEventListener("click", () => {
        searchInput.style.display = "block";
        searchInput.focus();
        setInputVisibility();
    });

    searchInput.addEventListener("input", () => {
        setInputVisibility();
    });

    searchInput.addEventListener("blur", () => {
        setInputVisibility();
    });
});
