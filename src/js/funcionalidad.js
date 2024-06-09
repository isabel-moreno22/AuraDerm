document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  //función para el menú desplegable
  function initMobileMenu() {
    const sidebar = document.querySelector(".sidebar");
    const menuButton = document.querySelector(".menu-button");
    const closeButton = document.querySelector(".sidebar li");

    if (menuButton) {
      menuButton.addEventListener("click", () => {
        sidebar.classList.toggle("active");
      });
    }

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        sidebar.classList.remove("active");
      });
    }
  }

  fetch("nav.html")
    .then((response) => response.text())
    .then((data) => {
      header.innerHTML = data;
      initMobileMenu();
    })
    .catch((error) => console.error("Error al cargar nav.html:", error));

  fetch("cart.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("beforeend", data);
      showCart();
    })
    .catch((error) => console.error("Error al cargar cart.html:", error));

  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      footer.innerHTML = data;
    })
    .catch((error) => console.error("Error al cargar footer.html:", error));

    //Llamada al script de carrito
    const carritoScript = document.createElement('script');
    carritoScript.src = '../src/js/cart.js';
    document.head.appendChild(carritoScript);
});
