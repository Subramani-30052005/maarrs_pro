const express = require("express");
const axios = require("axios");
const router = express.Router();

let accessToken = null;
let tokenExpiry = 0;

// STEP 1 — Get Spotify Access Token
async function getSpotifyToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const now = Date.now();
  if (accessToken && now < tokenExpiry) return accessToken;

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    params,
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  accessToken = response.data.access_token;
  tokenExpiry = now + response.data.expires_in * 1000;
  return accessToken;
}

// STEP 2 — Preview Route
router.get("/preview", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const token = await getSpotifyToken();

    const search = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const track = search.data.tracks.items[0];
    if (!track) return res.json({ preview_url: null });

    res.json({
      title: track.name,
      artist: track.artists[0].name,
      preview_url: track.preview_url,
      image: track.album.images[0].url,
      track_id: track.id,
    });

  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: "Spotify API error" });
  }
});
console.log("Client ID:", process.env.SPOTIFY_CLIENT_ID);
console.log("Client Secret:", process.env.SPOTIFY_CLIENT_SECRET);


module.exports = router;
