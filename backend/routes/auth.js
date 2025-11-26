// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { loadUsers, saveUsers } = require("../models/User");

// const router = express.Router();
// const SECRET = "MOODIFY_SECRET_KEY"; // keep it safe

// // Signup
// router.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;
//   const users = loadUsers();

//   if (users.find(u => u.email === email)) {
//     return res.status(400).json({ message: "Email already exists" });
//   }

//   const hashed = await bcrypt.hash(password, 10);

//   const newUser = {
//     id: Date.now(),
//     name,
//     email,
//     password: hashed
//   };

//   users.push(newUser);
//   saveUsers(users);

//   res.json({ message: "User created successfully" });
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const users = loadUsers();

//   const user = users.find(u => u.email === email);
//   if (!user) return res.status(400).json({ message: "Invalid email" });

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) return res.status(400).json({ message: "Invalid password" });

//   const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
//     expiresIn: "7d"
//   });

//   res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
