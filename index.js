const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB has been connected"))
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));

app.get("/products", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products.html'));
});

app.get("/addProduct", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addProduct.html'));
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running");
});
