require("dotenv").config();
const express = require("express");
const cors = require("cors");

const moodsRouter = require("./routes/moods");
const spotifyRouter = require("./routes/spotify");
const authRouter = require("./routes/auth");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());

// AUTH ROUTES (NO TOKEN REQUIRED)
app.use("/auth", authRouter);

// MOODS ROUTES (TOKEN REQUIRED)
app.use("/api/moods", authMiddleware, moodsRouter);

// SPOTIFY ROUTES
app.use("/spotify", spotifyRouter);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
