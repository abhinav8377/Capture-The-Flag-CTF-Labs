# 🚩 CTF Labs Collection

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)

A modular platform for hosting Capture The Flag (CTF) challenges. Learn and practice cybersecurity skills across multiple domains in a safe, isolated environment.

> ⚠️ **Educational Use Only**: These applications contain intentional security vulnerabilities for learning purposes. Never deploy to production or test on unauthorized systems.

---

## 📖 Table of Contents

- [About the Platform](#-about-the-platform)
- [Challenge Categories](#-challenge-categories)
- [Available Labs](#-available-labs)
- [Getting Started](#-getting-started)
- [Running the Labs](#-running-the-labs)
- [Learning Path](#-learning-path)
- [Essential Tools](#-essential-tools)
- [Skills You'll Develop](#-skills-youll-develop)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Security Notice](#-security-notice)
- [License](#-license)

---

## 🎯 About the Platform

CTF Labs is a comprehensive, modular platform for hosting Capture The Flag challenges across multiple cybersecurity domains. Each lab is designed to teach specific security concepts through hands-on exploitation and defense techniques.

**Perfect for:**

- 🎓 Security enthusiasts and beginners
- 👨‍💻 Students learning cybersecurity
- 🏆 Bug bounty hunters practicing skills
- 🔒 Developers understanding vulnerabilities
- 📚 Security training and workshops
- 🎯 CTF competition preparation

**Platform Features:**

- ✅ Modular architecture - Easy to add new challenges
- ✅ Multiple categories - Web, Crypto, Forensics, and more
- ✅ Progressive difficulty - From beginner to advanced
- ✅ Detailed documentation - Hints, solutions, and explanations
- ✅ Real-world scenarios - Based on actual vulnerabilities
- ✅ Safe environment - Isolated and contained

---

## 🏆 Challenge Categories

This platform supports multiple CTF challenge categories:

### 🌐 Web Security

Exploit common web application vulnerabilities

- Authentication & Authorization flaws
- API security issues
- Token manipulation
- Session management

### 🔐 Cryptography

Break weak encryption and cryptographic implementations

- Classical ciphers
- Modern crypto weaknesses
- Hash functions
- Encoding schemes

### 🔍 Forensics

Analyze artifacts and recover hidden information

- File metadata analysis
- Steganography
- Memory forensics
- Network packet analysis

### 🔧 Binary Exploitation

Reverse engineer and exploit compiled programs

- Buffer overflows
- Format string vulnerabilities
- Binary analysis
- Shellcode development

### 📡 Network Security

Investigate and exploit network protocols

- Packet capture analysis
- Protocol vulnerabilities
- Traffic manipulation
- Network reconnaissance

### 🖥️ OSINT (Open Source Intelligence)

Gather information from public sources

- Social media investigation
- Metadata extraction
- Public records analysis
- Information gathering

### 🧩 Miscellaneous

Unique challenges that don't fit standard categories

- Logic puzzles
- Programming challenges
- Trivia and reconnaissance
- Custom scenarios

---

## 🧪 Available Labs

### Current Labs (Version 1.0)

| Lab                                                 | Port | Category     | Vulnerability Type  | Difficulty  |
| --------------------------------------------------- | ---- | ------------ | ------------------- | ----------- |
| [Auth Misconfiguration](auth_misconfiguration_lab/) | 4000 | Web Security | Default Credentials | ⭐ Easy     |
| [IDOR Challenge](idor_ctf_lab/)                     | 3001 | Web Security | Access Control      | ⭐ Easy     |
| [Weak JWT Auth](weak_jwt_auth_lab/)                 | 6000 | Web Security | Token Security      | ⭐⭐ Medium |
| [Image Steganography](image_stegnography_lab/)      | 7000 | Forensics    | Metadata Analysis   | ⭐ Easy     |

### Coming Soon 🚀

**Web Security:**

- SQL Injection
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- XXE (XML External Entity)
- Command Injection
- File Upload Vulnerabilities

**Cryptography:**

- Caesar Cipher
- RSA Challenges
- Hash Cracking
- Base64 Encoding

**Forensics:**

- Memory Dump Analysis
- Network PCAP Investigation
- Log File Analysis

**Binary Exploitation:**

- Stack Buffer Overflow
- Format String Exploitation

Want to contribute? See our [Contributing Guide](#-contributing)!

---

## 🚀 Getting Started

### Prerequisites

Before running the labs, ensure you have:

**Required:**

- **Node.js** (v14.x or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

**Optional Tools (depends on challenge type):**

- **Browser Developer Tools** (F12) - Web challenges
- **[JWT.io](https://jwt.io)** - Token analysis
- **Postman** or **curl** - API testing
- **exiftool** - Metadata extraction
- **Wireshark** - Network analysis (future challenges)
- **Ghidra/IDA** - Binary analysis (future challenges)
- **Python 3** - Scripting and automation

#### Installing Optional Tools

**exiftool (Forensics challenges):**

**Windows:**

```powershell
# Download from https://exiftool.org/
```

**macOS:**

```bash
brew install exiftool
```

**Linux:**

```bash
sudo apt install exiftool  # Debian/Ubuntu
sudo yum install perl-Image-ExifTool  # Fedora/RHEL
```

---

### 📥 Installation

#### Method 1: Automated Setup (Recommended)

Clone the repository and run the setup script:

```bash
# Clone the repository
git clone https://github.com/abhinav8377/Capture-The-Flag-CTF-Labs.git
cd Capture-The-Flag-CTF-Labs
```

**Windows (PowerShell):**

```powershell
.\setup.ps1
```

**Linux/Mac (Bash):**

```bash
chmod +x setup.sh
./setup.sh
```

The setup script will:

- ✅ Verify system requirements
- ✅ Install dependencies for all labs
- ✅ Generate challenge files
- ✅ Display setup summary

---

#### Method 2: Manual Setup

If you prefer manual installation:

```bash
# Install dependencies for each lab
cd auth_misconfiguration_lab && npm install && cd ..
cd idor_ctf_lab && npm install && cd ..
cd weak_jwt_auth_lab && npm install && cd ..
cd image_stegnography_lab && npm install && cd ..

# Generate challenge files
cd image_stegnography_lab
npm run generate
cd ..
```

---

### ⚡ Quick Install (One-liner)

**PowerShell:**

```powershell
Get-ChildItem -Directory -Exclude .git,.github | ForEach-Object { Set-Location $_.FullName; npm install; Set-Location .. }; Set-Location image_stegnography_lab; npm run generate; Set-Location ..
```

**Bash:**

```bash
for dir in */; do (cd "$dir" && npm install); done && cd image_stegnography_lab && npm run generate && cd ..
```

---

## 🏃 Running the Labs

### Starting Individual Labs

Each lab runs independently on its own port:

**Auth Misconfiguration Lab (Port 4000):**

```bash
cd auth_misconfiguration_lab
npm start
```

🌐 Open: http://localhost:4000

---

**IDOR Challenge (Port 3001):**

```bash
cd idor_ctf_lab
npm start
```

🌐 Open: http://localhost:3001

---

**Weak JWT Authentication (Port 6000):**

```bash
cd weak_jwt_auth_lab
npm start
```

🌐 Open: http://localhost:6000

---

**Image Steganography (Port 7000):**

```bash
cd image_stegnography_lab
npm start
```

🌐 Open: http://localhost:7000

---

### Running Multiple Labs Simultaneously

Run multiple challenges at once using separate terminals or a process manager:

**Option 1: Multiple Terminals**

- Open separate terminal windows for each lab
- No port conflicts - each lab uses a unique port

**Option 2: Process Manager (pm2)**

```bash
npm install -g pm2

# Start all labs
pm2 start auth_misconfiguration_lab/server.js --name auth-lab
pm2 start idor_ctf_lab/server.js --name idor-lab
pm2 start weak_jwt_auth_lab/server.js --name jwt-lab
pm2 start image_stegnography_lab/server.js --name stego-lab

# Monitor
pm2 status
pm2 logs

# Stop all
pm2 stop all
```

---

## 📚 Learning Path

### By Difficulty Level

**Beginner Track (⭐ Easy)**

1. Auth Misconfiguration - Basic credential testing
2. IDOR Challenge - Access control fundamentals
3. Image Steganography - Metadata analysis basics

**Intermediate Track (⭐⭐ Medium)**

1. Weak JWT - Token security
2. _(More coming soon)_

**Advanced Track (⭐⭐⭐ Hard)**

- _Coming soon_

### By Category

**Web Security Path:**

1. Auth Misconfiguration
2. IDOR Challenge
3. Weak JWT Auth

**Forensics Path:**

1. Image Steganography
2. _(More forensics labs coming soon)_

### Speedrun Challenge 🏆

Complete all labs in under 30 minutes!

---

## 🛠️ Essential Tools

### By Challenge Category

**Web Security:**

- Browser DevTools (F12)
- Burp Suite / OWASP ZAP
- curl / Postman
- JWT.io

**Cryptography:**

- CyberChef
- Python with pycrypto
- hashcat / John the Ripper
- Online cipher tools

**Forensics:**

- exiftool
- Wireshark
- Volatility (memory analysis)
- binwalk / foremost

**Binary Exploitation:**

- Ghidra / IDA Pro
- GDB / pwndbg
- ROPgadget
- pwntools

**Network Security:**

- Wireshark / tcpdump
- Nmap
- Netcat
- Scapy

### Quick Tool Reference

**Browser Console (F12):**

```javascript
// Fetch API call
fetch("/api/endpoint")
  .then((r) => r.json())
  .then(console.log);

// Modify cookies
document.cookie = "session=value; path=/";
```

**curl Commands:**

```bash
# GET with cookies
curl http://localhost:3001/api/user/1 -b "session=token"

# POST JSON data
curl -X POST http://localhost:4000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'
```

**exiftool:**

```bash
exiftool image.jpg              # View all metadata
exiftool -Author image.jpg      # Specific field
exiftool image.jpg > meta.txt   # Export to file
```

---

## 🎓 Skills You'll Develop

### Technical Skills

**Security Fundamentals:**

- Vulnerability identification
- Exploitation techniques
- Security best practices
- Secure coding principles

**Web Application Security:**

- Authentication & Authorization
- Session management
- API security
- Token manipulation

**Cryptography:**

- Cipher analysis
- Hash functions
- Encryption weaknesses
- Cryptographic protocols

**Forensics:**

- Artifact analysis
- Metadata extraction
- Steganography detection
- Digital investigation

**Network Security:**

- Packet analysis
- Protocol understanding
- Traffic inspection
- Network reconnaissance

### Soft Skills

- 🧠 Problem-solving and critical thinking
- 🔍 Attention to detail
- 📊 Systematic approach to challenges
- 📚 Research and documentation skills
- 🤝 Collaboration and knowledge sharing

---

## 🔧 Troubleshooting

### Common Issues

**Port Already in Use:**

```bash
# Windows
netstat -ano | findstr :PORT
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :PORT
kill -9 <PID>
```

**Dependencies Not Installing:**

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Challenge Files Missing:**

```bash
cd <lab_directory>
npm run generate  # If available
```

**Node Version Issues:**

```bash
node --version  # Should be v14+ or higher
# Update from https://nodejs.org/
```

---

## 🤝 Contributing

We welcome contributions! This platform thrives on community involvement.

### Ways to Contribute

- 🆕 **Add New Challenges** - Any CTF category welcome
- 🐛 **Fix Bugs** - Help improve existing labs
- 📖 **Improve Documentation** - Make it clearer
- 💡 **Suggest Features** - Share your ideas
- ⭐ **Star the Repo** - Show your support

### Wanted: New Challenge Ideas

**High Priority:**

- SQL Injection labs
- XSS challenges
- Cryptography puzzles
- Binary exploitation
- Network forensics
- OSINT challenges

**All Categories Welcome:**

- Web Security
- Cryptography
- Forensics
- Binary Exploitation
- Network Security
- OSINT
- Reverse Engineering
- Programming
- Miscellaneous

### Contribution Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/crypto-challenge`)
3. Add your challenge with proper documentation
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add RSA crypto challenge'`)
6. Push to your fork (`git push origin feature/crypto-challenge`)
7. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## ⚠️ Security Notice

### Educational Use Only

These labs contain intentional vulnerabilities for educational purposes.

**DO NOT:**

- ❌ Deploy to production or public servers
- ❌ Use on networks without authorization
- ❌ Apply techniques to unauthorized systems
- ❌ Use for malicious purposes

**DO:**

- ✅ Use in isolated local environments
- ✅ Practice ethical hacking
- ✅ Learn responsibly
- ✅ Share knowledge constructively
- ✅ Respect legal boundaries

### Ethical Hacking Principles

1. **Get Authorization** - Always obtain written permission
2. **Respect Privacy** - Don't access unauthorized data
3. **Do No Harm** - Never damage systems
4. **Report Responsibly** - Disclose vulnerabilities properly
5. **Follow Laws** - Comply with all regulations

---

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details.

Free to use, modify, and distribute with attribution.

---

## 🆘 Support & Resources

### Getting Help

- 📖 Check individual lab READMEs for walkthroughs
- 🐛 [Report bugs](https://github.com/abhinav8377/Capture-The-Flag-CTF-Labs/issues)
- 💬 [Ask questions](https://github.com/abhinav8377/Capture-The-Flag-CTF-Labs/discussions)
- ⭐ Star the repo if helpful!

### Learning Resources

**CTF Platforms:**

- [HackTheBox](https://www.hackthebox.com/)
- [TryHackMe](https://tryhackme.com/)
- [PicoCTF](https://picoctf.org/)
- [OverTheWire](https://overthewire.org/)

**Security Resources:**

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [PortSwigger Academy](https://portswigger.net/web-security)
- [CryptoHack](https://cryptohack.org/)
- [CTF Time](https://ctftime.org/)

---

## 🎉 Quick Start Summary

```bash
# 1. Clone repository
git clone https://github.com/abhinav8377/Capture-The-Flag-CTF-Labs.git
cd Capture-The-Flag-CTF-Labs

# 2. Run setup
.\setup.ps1      # Windows
./setup.sh       # Linux/Mac

# 3. Start a lab
cd auth_misconfiguration_lab
npm start

# 4. Open browser
# http://localhost:4000

# 5. Happy hacking! 🚩
```

---

<div align="center">

### 🚩 Ready to Begin Your CTF Journey? 🚩

**Start with:** `cd auth_misconfiguration_lab && npm start`

---

Made with ❤️ for the cybersecurity community

[⭐ Star](https://github.com/abhinav8377/Capture-The-Flag-CTF-Labs) • [🐛 Report Bug](https://github.com/abhinav8377/Capture-The-Flag-CTF-Labs/issues) • [💡 Request Feature](https://github.com/abhinav8377/Capture-The-Flag-CTF-Labs/issues) • [🤝 Contribute](CONTRIBUTING.md)

**Share your solutions:** `#CTFLabs` `#Cybersecurity` `#CTF`

</div>
