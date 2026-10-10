const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ==================== CONFIG ====================
const FLAG = "GR{weak_jwt_misconfiguration_solved}";

const users = {
  bob:   { username: "bob",   password: "bob123",   role: "user"  },
  alice: { username: "alice", password: "alice123", role: "user"  }
};

// ==================== JWT HELPERS ====================
// ⚠️ VULNERABILITY: we use alg "none" — no signature at all!
function createToken(payload) {
  return jwt.sign(payload, null, { algorithm: 'none' });
}

// ⚠️ VULNERABILITY: we accept the "none" algorithm AND skip verification
function verifyToken(token) {
  try {
    // decode without verification — accepts alg:none and any unsigned token
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded) return null;
    return decoded.payload;
  } catch (e) {
    return null;
  }
}

// ==================== MIDDLEWARE ====================
function authMiddleware(req, res, next) {
  const token = req.cookies.session_token; // ⬅ cookie name: session_token
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Invalid token" });

  req.user = payload;
  next();
}

function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: "Forbidden: admin access required" });
  }
  next();
}

// ==================== ROUTES ====================

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = createToken({
    username: user.username,
    role: user.role,
    iat: Math.floor(Date.now() / 1000)
  });

  // ⬅ token stored in cookie named "session_token"
  res.cookie('session_token', token, { httpOnly: false, sameSite: 'lax' });
  res.json({ success: true, username: user.username, role: user.role, token });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('session_token');
  res.json({ success: true });
});

app.get('/api/me', authMiddleware, (req, res) => {
  res.json({ username: req.user.username, role: req.user.role });
});

// ============ ADMIN-ONLY ENDPOINT ============
app.get('/api/admin/flag', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ flag: FLAG, message: "Welcome, administrator." });
});

app.get('/api/admin/users', authMiddleware, adminMiddleware, (req, res) => {
  res.json(Object.values(users).map(u => ({
    username: u.username, role: u.role
  })));
});

app.listen(PORT, () => {
  console.log(`🚩 Weak JWT Lab running at http://localhost:${PORT}`);
  console.log(`👤 Test creds: bob / bob123`);
  console.log(`🍪 Cookie: session_token (alg:none JWT)`);
});
