document.addEventListener("DOMContentLoaded", function () {
  // Cargar productos desde el JSON
  fetch("/src/json/productos.json")
    .then((response) => response.json())
    .then((data) => {
      const productContainer = document.getElementById("productContainer");
      data.forEach((product) => {
        addProduct(
          productContainer,
          product.id,
          product.name,
          product.img,
          product.description,
          product.price
        );
      });
    })
    .catch((error) => console.error("Error al cargar el JSON:", error));

  function addProduct(container, id, name, imgSrc, description, price) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const productImageContainer = document.createElement("div");
    productImageContainer.classList.add("product-image");

    const productImage = document.createElement("img");
    productImage.src = imgSrc;
    productImage.alt = name;

    const productDetails = document.createElement("div");
    productDetails.classList.add("product-details");

    const productName = document.createElement("h2");
    productName.textContent = name;

    const productDescription = document.createElement("p");
    productDescription.textContent = description;

    const productPrice = document.createElement("h4");
    productPrice.textContent = `$${price}`;

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Agregar al carrito";
    addToCartButton.setAttribute("data-id", id);
    addToCartButton.setAttribute("data-name", name);
    addToCartButton.setAttribute("data-img", imgSrc);
    addToCartButton.setAttribute("data-price", price);

    addToCartButton.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ id, name, img: imgSrc, price, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    });

    productImageContainer.appendChild(productImage);
    productDetails.appendChild(productName);
    productDetails.appendChild(productDescription);
    productDetails.appendChild(productPrice);
    productDetails.appendChild(addToCartButton);

    productDiv.appendChild(productImageContainer);
    productDiv.appendChild(productDetails);

    container.appendChild(productDiv);
  }
});
