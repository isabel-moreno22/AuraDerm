document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // inicia el menú móvil y manejadores de eventos para abrir y cerrar el sidebar
    function initMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        const menuButton = document.querySelector('.menu-button');
        const closeButton = document.querySelector('.sidebar li');

        if (menuButton) {
            menuButton.addEventListener('click', () => sidebar.classList.toggle('active'));
        }

        if (closeButton) {
            closeButton.addEventListener('click', () => sidebar.classList.remove('active'));
        }
    }

    // Carga dinámica del contenido del nav y footer, e inicia el menú móvil
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            header.innerHTML = data;
            initMobileMenu();
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => footer.innerHTML = data);
});
