let allProducts = [];
let filteredProducts = [];

// Fetch all products on page load
window.onload = function () {
  fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
      allProducts = data.products;
      filteredProducts = [...allProducts];
      populateBrandFilter(allProducts);
      displayProducts(allProducts);
    });
};

// Display products
function displayProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";
  products.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.thumbnail}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p><strong>Brand:</strong> ${p.brand}</p>
        <p><strong>Price:</strong> $${p.price}</p>
        <p><strong>Rating:</strong> ${p.rating}</p>
      </div>
    `;
  });
}

// Populate brand dropdown filter
function populateBrandFilter(products) {
  const brandSet = new Set(products.map(p => p.brand));
  const brandSelect = document.getElementById("brandFilter");
  brandSelect.innerHTML = '<option value="">Filter by Brand</option>';
  brandSet.forEach(brand => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    brandSelect.appendChild(option);
  });
}

// Search products
function searchProducts() {
  const input = document.getElementById("searchInput").value.trim();
  const errorBox = document.getElementById("error");

  if (input === "") {
    errorBox.textContent = "Search input cannot be empty.";
    return;
  }

  errorBox.textContent = "";

  fetch(`https://dummyjson.com/products/search?q=${input}`)
    .then(res => res.json())
    .then(data => {
      if (data.products.length === 0) {
        errorBox.textContent = "No products found.";
        document.getElementById("products").innerHTML = "";
      } else {
        allProducts = data.products;
        filteredProducts = [...allProducts];
        populateBrandFilter(allProducts);
        applyFilters();
      }
    });
}

// Sort function
function sortProducts(type) {
  let sorted = [...filteredProducts];

  switch (type) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating-asc":
      sorted.sort((a, b) => a.rating - b.rating);
      break;
    case "rating-desc":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    default:
      sorted = [...filteredProducts];
  }

  displayProducts(sorted);
}

// Apply brand and price filters
function applyFilters() {
  const brand = document.getElementById("brandFilter").value;
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;

  filteredProducts = allProducts.filter(p => {
    return (
      (brand === "" || p.brand === brand) &&
      p.price >= minPrice &&
      p.price <= maxPrice
    );
  });

  displayProducts(filteredProducts);
}
