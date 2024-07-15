document.addEventListener("DOMContentLoaded", function () {
  let products = [];

  // CARGAR PRODUCTOS DESDE EL JSON
  fetch("/src/json/productos.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      displayProducts(products);
    })
    .catch((error) => console.error("Error al cargar el JSON:", error));

  // FUNCIÓN PARA MOSTRAR PRODUCTOS EN LA PÁGINA
  function displayProducts(products) {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";
    products.forEach((product) => {
      addProduct(
        productContainer,
        product.id,
        product.name,
        product.img,
        product.description,
        product.price,
        product.category,
        product.skinType
      );
    });
  }

  function addProduct(container, id, name, imgSrc, description, price, category, skinType) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.dataset.category = category; // AÑADIR CATEGORÍAS PARA FILTRAR PRODUCTOS
    productDiv.dataset.skinType = skinType; // AÑADIR CATEGORÍAS PARA FILTRAR PRODUCTOS
    productDiv.dataset.price = price; // AÑADIR CATEGORÍAS PARA FILTRAR PRODUCTOS

    const productImageContainer = document.createElement("div");
    productImageContainer.classList.add("product-image");

    const productImage = document.createElement("img");
    productImage.src = imgSrc;
    productImage.alt = name;

    const productDetails = document.createElement("div");
    productDetails.classList.add("product-details");

    const productName = document.createElement("h2");
    productName.textContent = name;

    const productDescription = document.createElement("div");
    productDescription.classList.add("product-description");
    productDescription.innerHTML = `<p>${description}</p>`;

    const productPrice = document.createElement("h4");
    productPrice.textContent = `$${price}`;

    // AÑADIR PRODUCTOS AL CARRITO
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Agregar al carrito";
    addToCartButton.setAttribute("data-id", id);
    addToCartButton.setAttribute("data-name", name);
    addToCartButton.setAttribute("data-img", imgSrc);
    addToCartButton.setAttribute("data-price", price);

    productImageContainer.appendChild(productImage);
    productDetails.appendChild(productName);
    productDetails.appendChild(productDescription);
    productDetails.appendChild(productPrice);
    productDetails.appendChild(addToCartButton);

    productDiv.appendChild(productImageContainer);
    productDiv.appendChild(productDetails);

    container.appendChild(productDiv);
  }

  // FUNCIÓN PARA APLICAR FILTROS CON EL BOTÓN APLICAR FILTROS
  document.querySelectorAll(".applyFilters").forEach(button => {
    button.addEventListener("click", function () {
      // OBTENER LAS CATEGORIAS DE PRODUCTOS SELECCIONADAS
      const selectedCategories = Array.from(
        document.querySelectorAll("#categoryFilters input:checked")
      ).map((checkbox) => checkbox.value);

      // OBTENER PRODUCTOS SEGUN TIPO DE PIEL
      const selectedSkinTypes = Array.from(
        document.querySelectorAll("#skinTypeFilters input:checked")
      ).map((checkbox) => checkbox.value);

      // OBTENER PRODUCTOS SEGUN RANGO DE PRECIO
      const minPrices = Array.from(document.querySelectorAll(".minPrice")).map(input => parseFloat(input.value)).filter(val => !isNaN(val));
      const maxPrices = Array.from(document.querySelectorAll(".maxPrice")).map(input => parseFloat(input.value)).filter(val => !isNaN(val));

      const minPrice = minPrices.length ? Math.min(...minPrices) : 0;
      const maxPrice = maxPrices.length ? Math.max(...maxPrices) : Infinity;

      // FILTRAR  LOS PRODUCTOS
      const filteredProducts = products.filter((product) => {
        const categoryMatch = selectedCategories.length
          ? selectedCategories.includes(product.category)
          : true;
        const skinTypeMatch = selectedSkinTypes.length
          ? selectedSkinTypes.includes(product.skinType)
          : true;
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;

        return categoryMatch && skinTypeMatch && priceMatch;
      });

      displayProducts(filteredProducts);
      closeFiltersSidebar(); // CERRAR LA BARRA LATERAL DESPUÉS DE APLICAR LOS FILTROS
    });
  });

  // LIMPIAR FILTROS
  document.querySelectorAll(".clearFilters").forEach(button => {
    button.addEventListener("click", function () {
      document.querySelectorAll("#categoryFilters input:checked").forEach((checkbox) => {
        checkbox.checked = false;
      });
      document.querySelectorAll("#skinTypeFilters input:checked").forEach((checkbox) => {
        checkbox.checked = false;
      });

      document.querySelectorAll(".minPrice").forEach(input => input.value = "");
      document.querySelectorAll(".maxPrice").forEach(input => input.value = "");

      displayProducts(products);
    });
  });

  // MOSTRAR BARRA LATERAL DE FILTROS
  document.getElementById("filter-btn").addEventListener("click", function () {
    document.querySelector(".filters-sidebar").classList.add("visible");
  });

  // CERRAR BARRA LATERAL DE FILTROS
  document.getElementById("close-filters-btn").addEventListener("click", function () {
    document.querySelector(".filters-sidebar").classList.remove("visible");
  });

  function closeFiltersSidebar() {
    document.querySelector(".filters-sidebar").classList.remove("visible");
  }
});
