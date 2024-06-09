function showCart() {
  const button = document.getElementById("shopping-cart");
  const sidecart = document.querySelector(".sidecart");
  const closeCartBtn = document.getElementById("close-cart-btn");

  if (button && sidecart) {
    button.addEventListener("click", () => {
      sidecart.classList.toggle("active");
      renderCart();
      saveCart();
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

document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  
  function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
    
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
        <div class="remove-item" data-id="${item.id}"><span>&times;</span></div>
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

    updateSubtotal();
  }

  function updateSubtotal() {
    const subtotalPriceElement = document.getElementById("subtotal-price");
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    subtotalPriceElement.textContent = subtotal.toFixed(2);
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    const itemId = parseInt(target.getAttribute("data-id"));

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

    if (target.classList.contains("increase-qty")) {
      const item = cart.find((item) => item.id === itemId);
      if (item) {
        item.quantity++;
        renderCart();
        saveCart();
      }
    }

    if (target.classList.contains("remove-item")) {
      cart = cart.filter((item) => item.id !== itemId);
      renderCart();
      saveCart();
    }

    if (
      event.target.tagName === "BUTTON" &&
      event.target.textContent === "Agregar al carrito"
    ) {
      const id = parseInt(event.target.getAttribute("data-id"));
      const name = event.target.getAttribute("data-name");
      const img = event.target.getAttribute("data-img");
      const price = parseFloat(event.target.getAttribute("data-price"));

      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ id, name, img, price, quantity: 1 });
      }

      renderCart();
      saveCart();
    }
  });
  renderCart();
});
