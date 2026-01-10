const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();


app.use("/api/orders", orderRoutes);


// Load env variables
dotenv.config();

// Connect to DB
connectDB();

// Initialize app FIRST

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

// Protected route example
app.get("/api/profile", protect, (req, res) => {
  res.json(req.user);
});

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
