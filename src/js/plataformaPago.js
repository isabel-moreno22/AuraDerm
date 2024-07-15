import { cart } from "./cart.js";

document.addEventListener("DOMContentLoaded", function () {
  renderCartItemsInPaymentPage();
  setupPaymentMethods();
});

function renderCartItemsInPaymentPage() {
  const productosContainer = document.getElementById("productos");
  if (!productosContainer) return;

  productosContainer.innerHTML = "";

  cart.forEach((item) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    productItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <p>${item.name}</p>
       ${item.quantity}</strong>
      <p>$${(item.price * item.quantity).toFixed(2)}</p>
    `;

    productosContainer.appendChild(productItem);
  });
  

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("subtotal-price").textContent = subtotal.toFixed(2);

  const envioPriceElement = document.getElementById("envio-price");
  const envio = parseFloat(envioPriceElement.textContent);
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = (subtotal + envio).toFixed(2);
}

function setupPaymentMethods() {
  document.getElementById("pse-radio").addEventListener("change", function () {
    var mensajePSE = document.getElementById("pse-mensaje");
    var mensajeWompi = document.getElementById("wompi-mensaje");
    if (this.checked) {
      mensajePSE.style.display = "block";
      mensajeWompi.style.display = "none";
    }
  });

  document.getElementById("wompi-radio").addEventListener("change", function () {
    var mensajePSE = document.getElementById("pse-mensaje");
    var mensajeWompi = document.getElementById("wompi-mensaje");
    if (this.checked) {
      mensajeWompi.style.display = "block";
      mensajePSE.style.display = "none";
    }
  });
}
