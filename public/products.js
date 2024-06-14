document.addEventListener("DOMContentLoaded", async function() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload

    if (user.isAdmin) {
        const addProductLink = document.createElement("a");
        addProductLink.href = "/addProduct";
        addProductLink.innerText = "Add Product";
        document.body.appendChild(addProductLink);
    }

    async function fetchProducts() {
        try {
            const response = await fetch("/api/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const products = await response.json();
            if (response.ok) {
                displayProducts(products);
            } else {
                document.getElementById("products").innerText = `Error: ${products}`;
            }
        } catch (error) {
            document.getElementById("products").innerText = `Error: ${error.message}`;
        }
    }

    function displayProducts(products) {
        const productsDiv = document.getElementById("products");
        productsDiv.innerHTML = ''; // Clear any existing content
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.innerHTML = `
                <h3>${product.title}</h3>
                <p>${product.desc}</p>
                <img src="${product.img}" alt="${product.title}" style="max-width: 200px;"/>
                <p>Categories: ${product.categories.join(', ')}</p>
                <p>Size: ${product.size}</p>
                <p>Color: ${product.color}</p>
                <p>Price: $${product.price}</p>
            `;
            productsDiv.appendChild(productDiv);
        });
    }

    fetchProducts();
});
