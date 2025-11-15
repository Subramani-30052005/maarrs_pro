const fs = require('fs').promises;
const path = require('path');
const dbPath = path.join(__dirname, '..', 'db.json');

async function readDB(){
  const data = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(data);
}
async function writeDB(obj){
  await fs.writeFile(dbPath, JSON.stringify(obj, null, 2), 'utf-8');
}

function makeId(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

exports.getAllMoods = async (req, res) => {
  try {
    const db = await readDB();
    res.json(db.moods || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read DB' });
  }
};

exports.getMoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await readDB();
    const mood = db.moods.find(m => m.id === id);
    if (!mood) return res.status(404).json({ error: 'Mood not found' });
    res.json(mood);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read DB' });
  }
};

exports.createMood = async (req, res) => {
  try {
    const { name, songs } = req.body;
    if (!name || !Array.isArray(songs)) return res.status(400).json({ error: 'Invalid payload' });
    const db = await readDB();
    const newMood = { id: makeId(), name, songs };
    db.moods.push(newMood);
    await writeDB(db);
    res.status(201).json(newMood);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create mood' });
  }
};

exports.updateMood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, songs } = req.body;
    const db = await readDB();
    const idx = db.moods.findIndex(m => m.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Mood not found' });
    db.moods[idx] = { ...db.moods[idx], name: name ?? db.moods[idx].name, songs: Array.isArray(songs)? songs : db.moods[idx].songs };
    await writeDB(db);
    res.json(db.moods[idx]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update mood' });
  }
};

exports.deleteMood = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await readDB();
    const newMoods = db.moods.filter(m => m.id !== id);
    if (newMoods.length === db.moods.length) return res.status(404).json({ error: 'Mood not found' });
    db.moods = newMoods;
    await writeDB(db);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete mood' });
  }
};

exports.recommendByMoodName = async (req, res) => {
  try {
    const { moodName } = req.params;
    const db = await readDB();
    // case-insensitive match
    const mood = db.moods.find(m => m.name.toLowerCase() === moodName.toLowerCase());
    if (!mood) return res.status(404).json({ error: 'Mood not found' });
    // For now recommendation = all songs for mood; you may improve later.
    res.json({ mood: mood.name, recommended: mood.songs });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get recommendation' });
  }
};
