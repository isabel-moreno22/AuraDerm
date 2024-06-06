document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  //   const cart = document.querySelector("cart-login");

  // inicia el menú móvil y manejadores de eventos para abrir y cerrar el sidebar
  function initMobileMenu() {
    const sidebar = document.querySelector(".sidebar");
    const menuButton = document.querySelector(".menu-button");
    const closeButton = document.querySelector(".sidebar li");

    if (menuButton) {
      menuButton.addEventListener("click", () =>
        sidebar.classList.toggle("active")
      );
    }

    if (closeButton) {
      closeButton.addEventListener("click", () =>
        sidebar.classList.remove("active")
      );
    }
  }

  // Carga dinámica del contenido del nav y footer, e inicia el menú móvil

  fetch("nav.html")
    .then((response) => response.text())
    .then((data) => {
      header.innerHTML = data;
      initMobileMenu();
    });

  fetch("cart.html")
    .then((response) => response.text())
    .then((data) => {
      innerHTML = data;
      showCart();
    });

  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      footer.innerHTML = data;
    });

  function showCart() {
    const button = document.getElementById("shopping-cart");
    const sidecart = document.querySelector("sidecart");
    const closeCartBtn = document.getElementById("close-cart-btn");
    const goToCartBtn = document.getElementById("go-to-cart");
    console.log(button);
    console.log(sidecart);

    button.addEventListener("click", () => {
      sidecart.classList.toggle("active");
    });

    // closeCartBtn.addEventListener("click", () => {
    //   sidecart.classList.toggle("active");
    // });

    // goToCartBtn.addEventListener("click", () => {
    //   window.location.href = "/views/cart.html";
    // });
  }
});
