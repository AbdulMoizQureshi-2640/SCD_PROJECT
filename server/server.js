require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser"); // Added for cookie handling
const cors = require("cors"); // Import the CORS package
const inventoryRoutes = require("./routes/inventorymngmt");
const categoryRoutes = require("./routes/category");
const authRoutes = require("./routes/auth"); // Corrected to import authRoutes
const orderRoutes = require("./routes/orderMngmt");
const stockAlertRoutes = require("./routes/stockAlerts");
const dashboardRoutes = require("./routes/dashboard");
const Overview = require("./routes/Overview");
const app = express();
const path = require("path");
const MONGODB_URI =
  "mongodb://suleman:ahmadzai@cluster0-shard-00-00.5ufct.mongodb.net:27017,cluster0-shard-00-01.5ufct.mongodb.net:27017,cluster0-shard-00-02.5ufct.mongodb.net:27017/inventify?retryWrites=true&w=majority&authSource=admin&ssl=true";

// Enable CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", // Use '*' for all domains or specify a specific one
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed HTTP methods
  credentials: true, // Allow cookies to be included in the request
};

app.use(cors(corsOptions)); // Use the CORS middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve React static files
app.use(express.static(path.join(__dirname, "../client/build")));

// Fallback to index.html for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Middleware
app.use(express.json());
app.use(cookieParser()); // Added middleware for cookie parsing

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stock-alerts", stockAlertRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/overview", Overview);

// Database connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Start server
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
