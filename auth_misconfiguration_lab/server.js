const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ==================== CONFIG ====================
const FLAG = "GR{auth_misconfiguration_solved}";

// ⚠️ VULNERABILITY: Default credentials left unchanged
const ADMIN_CREDS = {
  username: "admin",
  password: "admin"   // classic default creds
};

// Regular users (for realism)
const users = {
  guest: { password: "guest", role: "user" }
};

const sessions = {};

function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function authMiddleware(req, res, next) {
  const token = req.cookies.session;
  if (!token || !sessions[token]) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  req.user = sessions[token];
  next();
}

function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: "Forbidden: admin only" });
  }
  next();
}

// ==================== ROUTES ====================

// Login - handles both regular and admin users
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Check admin (DEFAULT CREDS)
  if (username === ADMIN_CREDS.username && password === ADMIN_CREDS.password) {
    const token = generateToken();
    sessions[token] = { username, role: 'admin' };
    res.cookie('session', token, { httpOnly: true });
    return res.json({ success: true, username, role: 'admin' });
  }

  // Check regular users
  const user = users[username];
  if (user && user.password === password) {
    const token = generateToken();
    sessions[token] = { username, role: user.role };
    res.cookie('session', token, { httpOnly: true });
    return res.json({ success: true, username, role: user.role });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

app.post('/api/logout', (req, res) => {
  const token = req.cookies.session;
  if (token) delete sessions[token];
  res.clearCookie('session');
  res.json({ success: true });
});

app.get('/api/me', authMiddleware, (req, res) => {
  res.json(req.user);
});

// Admin-only endpoint: returns the flag
app.get('/api/admin/flag', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ flag: FLAG });
});

app.listen(PORT, () => {
  console.log(`🚩 Auth Misconfiguration Lab running at http://localhost:${PORT}`);
  console.log(`ℹ️  Regular test creds: guest / guest`);
  console.log(`🎯 Goal: find the default admin credentials`);
});
