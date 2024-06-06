document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const cartContainer = document.querySelector(".cart-container"); // 
  
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
        // Inserta el contenido del carrito en el body directamente
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
  function showCart() {
      const button = document.getElementById("shopping-cart");
      const sidecart = document.querySelector(".sidecart");
      const closeCartBtn = document.getElementById("close-cart-btn");
      const goToCartBtn = document.getElementById("go-to-cart");
  
      if (button && sidecart) {
        button.addEventListener("click", () => {
          sidecart.classList.toggle("active");
        });
  
        if (closeCartBtn) {
          closeCartBtn.addEventListener("click", () => {
            sidecart.classList.toggle("active");
          });
        }
  
        if (goToCartBtn) {
          goToCartBtn.addEventListener("click", () => {
            window.location.href = "/views/cart.html";
          });
        }
      } else {
        console.error("No se encontraron los elementos necesarios para el carrito");
      }
    }
  });