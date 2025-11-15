require("dotenv").config();
const express = require('express');
const cors = require('cors');
const moodsRouter = require('./routes/moods');
const spotifyRouter = require("./routes/spotify");



const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/moods', moodsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/spotify", spotifyRouter);
