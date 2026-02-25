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
   🌍 CORS CONFIG (DEV + PROD SAFE)
================================ */

// Allowed origins
const allowedOrigins = [
  "http://localhost:3000",                // Local frontend
  process.env.FRONTEND_URL                // Vercel frontend (set in Render)
].filter(Boolean); // Removes undefined values

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        console.log("✅ Allowed origins:", allowedOrigins);
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
  console.log(`🚀 Server running on port ${PORT}`);
});