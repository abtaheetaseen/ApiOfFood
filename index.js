require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

const PORT = process.env.PORT || 4000;

const products_routes = require("./routes/product")

app.get("/", (req, res) => {
    res.send("Server");
});

// middleware to set router
app.use("/api/products", products_routes);

app.listen(PORT, async () => {
    console.log(`server running on ${PORT}`);
    await connectDB(process.env.MONGO_URL);
});