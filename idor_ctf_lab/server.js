const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ==================== DATABASE (In-Memory) ====================
// The flag is stored in the admin's (user id=1) private notes
const FLAG = "GR{idor_room_solved}";

const users = {
  1: {
    id: 1,
    username: "admin",
    password: "admin123",
    email: "admin@idorlab.local",
    role: "admin",
    secret: FLAG
  },
  2: {
    id: 2,
    username: "john",
    password: "password",
    email: "john@idorlab.local",
    role: "user",
    secret: "John's private note: Remember to buy milk."
  },
  3: {
    id: 3,
    username: "alice",
    password: "alice123",
    email: "alice@idorlab.local",
    role: "user",
    secret: "Alice's private note: Meeting at 3 PM tomorrow."
  }
};

// Simple session store (token -> userId)
const sessions = {};

function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function authMiddleware(req, res, next) {
  const token = req.cookies.session;
  if (!token || !sessions[token]) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  req.userId = sessions[token];
  next();
}

// ==================== ROUTES ====================

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = Object.values(users).find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken();
  sessions[token] = user.id;

  res.cookie('session', token, { httpOnly: true });
  res.json({ success: true, userId: user.id, username: user.username });
});

// Logout
app.post('/api/logout', (req, res) => {
  const token = req.cookies.session;
  if (token) delete sessions[token];
  res.clearCookie('session');
  res.json({ success: true });
});

// Get current user
app.get('/api/me', authMiddleware, (req, res) => {
  const user = users[req.userId];
  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role
  });
});

// ================= VULNERABLE ENDPOINT =================
// IDOR: Anyone authenticated can fetch ANY user's profile by changing the id
app.get('/api/user/:id', authMiddleware, (req, res) => {
  const targetId = parseInt(req.params.id, 10);
  const targetUser = users[targetId];

  if (!targetUser) {
    return res.status(404).json({ error: "User not found" });
  }

  // ❌ VULNERABILITY: No authorization check!
  // We return the target user's private "secret" field
  res.json({
    id: targetUser.id,
    username: targetUser.username,
    email: targetUser.email,
    role: targetUser.role,
    secret: targetUser.secret   // <-- This exposes the flag
  });
});

// ==================== START ====================
app.listen(PORT, () => {
  console.log(`🚩 IDOR CTF Lab running at http://localhost:${PORT}`);
  console.log(`👤 Try logging in as: john / password`);
});
