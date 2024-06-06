document.addEventListener("DOMContentLoaded", function () {
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
});

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

  productImageContainer.appendChild(productImage);
  productDetails.appendChild(productName);
  productDetails.appendChild(productDescription);
  productDetails.appendChild(productPrice);
  productDetails.appendChild(addToCartButton);

  productDiv.appendChild(productImageContainer);
  productDiv.appendChild(productDetails);

  container.appendChild(productDiv);
}
