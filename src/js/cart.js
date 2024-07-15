export let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Función para renderizar elementos dentro del carrito
export function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  //Mensaje para carrito vacío
  if (cart.length === 0) {
    const emptyMessageContainer = document.createElement("div");
    emptyMessageContainer.classList.add("empty-message-container");

    const emptyMessage = document.createElement("p");
    emptyMessage.innerHTML =
      "Carrito vacío<br>Aún no tienes productos dentro del carrito";
    emptyMessage.classList.add("empty-cart-message");

    emptyMessageContainer.appendChild(emptyMessage);
    cartItemsContainer.appendChild(emptyMessageContainer);
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
              <div class="remove-item-container">
                  <svg class="remove-item" data-id="${item.id}" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="fff">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                          <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      </g>
                  </svg>
              </div>
              <div class="item-img">
                  <img src="${item.img}" alt="${item.name}">
              </div>
              <div class="item-details">
                  <p>${item.name}</p>
                  <strong>$${item.price}</strong>
                  <div class="qty">
                      <span class="decrease-qty" data-id="${item.id}">-</span>
                      <strong>${item.quantity}</strong>
                      <span class="increase-qty" data-id="${item.id}">+</span>
                  </div>
              </div>
          `;

      cartItemsContainer.appendChild(cartItem);
    });
  }

  updateSubtotal();
  updateCartCount();
}
//Actualizar subtotal
export function updateSubtotal() {
  const subtotalPriceElement = document.getElementById("subtotal-price");
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  subtotalPriceElement.textContent = subtotal.toFixed(2);
}
//Función para actualizar contador de elementos agregados al carrito
export function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalCount > 0) {
    cartCountElement.textContent = totalCount;
    cartCountElement.classList.remove("hidden");
  } else {
    cartCountElement.classList.add("hidden");
  }
}
//Guardar en localStorage
export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
//Función para mostrar y ocultar el carrito
export function showCart() {
  const button = document.getElementById("shopping-cart");
  const sidecart = document.querySelector(".sidecart");
  const closeCartBtn = document.getElementById("close-cart-btn");

  if (button && sidecart) {
    button.addEventListener("click", () => {
      sidecart.classList.toggle("active");
      renderCart();
    });

    if (closeCartBtn) {
      closeCartBtn.addEventListener("click", () => {
        sidecart.classList.toggle("active");
      });
    } else {
      console.error(
        "No se encontraron los elementos necesarios para el carrito"
      );
    }
  }
}
//Función para agregar restar, aumentar  y eliminar elementos del carrito
export function cartActions() {
  document.addEventListener("click", (event) => {
    const target = event.target;
    const itemId = parseInt(target.getAttribute("data-id"));
    //Disminuir elementos
    if (target.classList.contains("decrease-qty")) {
      const item = cart.find((item) => item.id === itemId);
      if (item) {
        item.quantity--;
        if (item.quantity === 0) {
          cart = cart.filter((item) => item.id !== itemId);
        }
        renderCart();
        saveCart();
      }
    }
    //Incrementar elementos
    if (target.classList.contains("increase-qty")) {
      const item = cart.find((item) => item.id === itemId);
      if (item) {
        item.quantity++;
        renderCart();
        saveCart();
      }
    }
    //Eliminar elementos
    if (
      target.classList.contains("remove-item") ||
      (target.parentElement &&
        target.parentElement.classList.contains("remove-item"))
    ) {
      cart = cart.filter((item) => item.id !== itemId);
      renderCart();
      saveCart();
    }
    //Agregar los elementos al carrito
    if (
      target.tagName === "BUTTON" &&
      target.textContent === "Agregar al carrito"
    ) {
      const id = parseInt(target.getAttribute("data-id"));
      const name = target.getAttribute("data-name");
      const img = target.getAttribute("data-img");
      const price = parseFloat(target.getAttribute("data-price"));

      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ id, name, img, price, quantity: 1 });
      }

      renderCart();
      saveCart();
      updateCartCount();
    }
    
  });

  //Funcion para redirigir a la plataforma de pago
  const checkoutButton = document.querySelector(".cart-actions button");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      window.location.href = "plataformaPago.html";
    });
  }
}
