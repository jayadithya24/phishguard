require("dotenv").config();

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const scanRoutes = require("./routes/scanRoutes");

const app = express();

/* ================================
   🔐 CORS CONFIG (ONLY ONCE)
================================ */
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

/* ================================
   🧾 MIDDLEWARE
================================ */
app.use(express.json());

/* ================================
   🛣 ROUTES
================================ */
app.use("/api/auth", authRoutes);
app.use("/api/scan", scanRoutes);

app.get("/", (req, res) => {
  res.send("PhishGuard Backend Running");
});

/* ================================
   🚀 START SERVER
================================ */
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});