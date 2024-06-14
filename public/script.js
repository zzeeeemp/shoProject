document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        if (response.ok) {
            localStorage.setItem("token", result.accessToken);
            document.getElementById("result").innerText = "Login successful!";
            window.location.href = "/products";  // Redirect to products page
        } else {
            document.getElementById("result").innerText = `Error: ${result}`;
        }
    } catch (error) {
        document.getElementById("result").innerText = `Error: ${error.message}`;
    }
});
