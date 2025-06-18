let allProducts = [];

// Fetch all products on page load
window.onload = function () {
  fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
      allProducts = data.products;
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
        <p>Price: $${p.price}</p>
        <p>Rating: ${p.rating}</p>
      </div>
    `;
  });
}

// Search function with input validation
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
        displayProducts(data.products);
      }
    });
}

// Client-side sorting
function sortProducts(type) {
  let sorted = [...allProducts];

  if (type === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (type === "price-desc") {
    sorted.sort((a, b) => b.price - a.price);
  } else if (type === "rating-asc") {
    sorted.sort((a, b) => a.rating - b.rating);
  } else if (type === "rating-desc") {
    sorted.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(sorted);
}
