const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
require('dotenv').config()

// middleware
app.use(express.json());

// CORS configuration - allow frontend origin
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://book-app-frontend-idt4.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route")
const userRoutes =  require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats")

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

main().catch(err => console.log("mongo db not connect"));

async function main() {
  await mongoose.connect(process.env.DB_URL);

console.log("Mongodb connected sucessfully ")
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
