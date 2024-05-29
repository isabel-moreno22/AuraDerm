document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Cargar contenido del archivo nav.html en el header
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            header.innerHTML = data;
        });

    // Cargar contenido del archivo footer.html en el footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            footer.innerHTML = data;
        });
});