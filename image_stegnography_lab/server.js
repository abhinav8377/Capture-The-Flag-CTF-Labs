const express = require('express');
const path = require('path');
const fs = require('fs');

const FLAG = require('./flag');

const app = express();
const PORT = 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the challenge image explicitly (in case static doesn't pick it up)
app.get('/challenge.jpg', (req, res) => {
  const imgPath = path.join(__dirname, 'public', 'challenge.jpg');
  if (!fs.existsSync(imgPath)) {
    return res.status(500).send('Run `npm run generate` first.');
  }
  res.setHeader('Content-Type', 'image/jpeg');
  res.sendFile(imgPath);
});

// Downloadable copy (same bytes — for exiftool users)
app.get('/download', (req, res) => {
  const imgPath = path.join(__dirname, 'public', 'challenge.jpg');
  if (!fs.existsSync(imgPath)) {
    return res.status(500).send('Run `npm run generate` first.');
  }
  res.download(imgPath, 'challenge.jpg');
});

// Flag submission — verified server-side so the flag never appears in client JS
app.post('/api/submit', (req, res) => {
  const submitted = (req.body.flag || '').trim();
  if (!submitted) {
    return res.status(400).json({ success: false, error: 'Enter the author name.' });
  }
  if (submitted === FLAG) {
    return res.json({ success: true, message: 'Correct! You found the author. 🚩' });
  }
  return res.status(400).json({ success: false, error: "Incorrect — that's not the author. Try again." });
});

app.listen(PORT, () => {
  console.log(`🚩 Image Stego Lab running at http://localhost:${PORT}`);
  console.log(`🖼️  Challenge image: http://localhost:${PORT}/challenge.jpg`);
});
