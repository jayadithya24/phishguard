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
   🌍 CORS CONFIG (DEV + PROD)
================================ */

const allowedOrigins = [
  "http://localhost:3000",                 // local frontend
  process.env.FRONTEND_URL                 // production frontend (Vercel)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
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
  res.send("🚀 PhishGuard Backend Running");
});

/* ================================
   🚀 START SERVER
================================ */

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});