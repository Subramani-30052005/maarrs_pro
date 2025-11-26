const express = require("express");
const router = express.Router();
const controller = require("../controllers/moodController");

// MOOD CRUD ROUTES
router.get("/", controller.getAllMoods);
router.get("/:id", controller.getMoodById);
router.post("/", controller.createMood);
router.put("/:id", controller.updateMood);
router.delete("/:id", controller.deleteMood);

// RECOMMENDATION
router.get("/recommendation/:moodName", controller.recommendByMoodName);

module.exports = router;
