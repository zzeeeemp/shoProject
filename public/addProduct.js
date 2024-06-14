document.getElementById("add-product-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;
    const img = document.getElementById("img").value;
    const categories = document.getElementById("categories").value.split(',').map(cat => cat.trim());
    const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;
    const price = document.getElementById("price").value;

    try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, desc, img, categories, size, color, price })
        });

        const result = await response.json();
        document.getElementById("result").innerText = response.ok ? "Product added successfully!" : `Error: ${result}`;
    } catch (error) {
        document.getElementById("result").innerText = `Error: ${error.message}`;
    }
});
