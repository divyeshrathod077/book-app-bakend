const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://book-app-frontend-idt4.vercel.app",
    ],
    credentials: true,
  })
);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");
const paymentRoutes = require("./src/payment/payment.routes");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

// MongoDB Connection
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB Connected Successfully");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
}

main();