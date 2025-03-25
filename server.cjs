const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3001;

// Allow requests from multiple origins
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://superhero-finder-roan.vercel.app" // Vercel deployment (replace with your actual Vercel URL)
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  }
}));

const API_KEY = process.env.SUPERHERO_API_KEY;
console.log("API_KEY loaded from .env:", API_KEY);

app.get("/search/:query", async (req, res) => {
  const query = req.params.query;
  try {
    const response = await axios.get(
      `https://superheroapi.com/api/${API_KEY}/search/${query}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from Superhero API" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});