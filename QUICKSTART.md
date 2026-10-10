# 🚀 Quick Start Guide

Get up and running with CTF Labs in minutes!

## ⚡ Quick Setup

### Option 1: Automated Setup (Recommended)

**Windows (PowerShell):**

```powershell
.\setup.ps1
```

**Linux/Mac (Bash):**

```bash
chmod +x setup.sh
./setup.sh
```

This will install all dependencies and generate challenge files automatically.

### Option 2: Manual Setup

1. **Install dependencies for all labs:**

   ```bash
   cd auth_misconfiguration_lab && npm install && cd ..
   cd idor_ctf_lab && npm install && cd ..
   cd weak_jwt_auth_lab && npm install && cd ..
   cd image_stegnography_lab && npm install && cd ..
   ```

2. **Generate steganography challenge:**
   ```bash
   cd image_stegnography_lab
   npm run generate
   cd ..
   ```

## 🎯 Start Hacking

### Lab 1: Authentication Misconfiguration (Easiest)

```bash
cd auth_misconfiguration_lab
npm start
```

**URL:** http://localhost:4000  
**Goal:** Find default admin credentials  
**Hint:** Try common combinations

---

### Lab 2: IDOR Vulnerability

```bash
cd idor_ctf_lab
npm start
```

**URL:** http://localhost:3001  
**Goal:** Access admin's private data  
**Login:** `john / password`

---

### Lab 3: Weak JWT Authentication

```bash
cd weak_jwt_auth_lab
npm start
```

**URL:** http://localhost:6000  
**Goal:** Forge a JWT token to get admin access  
**Login:** `bob / bob123`

---

### Lab 4: Image Steganography

```bash
cd image_stegnography_lab
npm start
```

**URL:** http://localhost:7000  
**Goal:** Extract hidden author from image metadata  
**Tool needed:** exiftool

## 📊 Difficulty Levels

| Lab                   | Difficulty  | Time   | Skills Learned      |
| --------------------- | ----------- | ------ | ------------------- |
| Auth Misconfiguration | ⭐ Easy     | 5 min  | Default credentials |
| IDOR                  | ⭐ Easy     | 10 min | Access control      |
| Weak JWT              | ⭐⭐ Medium | 15 min | JWT manipulation    |
| Image Stego           | ⭐ Easy     | 10 min | Metadata analysis   |

## 🛠️ Essential Tools

### Browser Tools (Built-in)

- **Developer Console** (F12)
- **Network Tab** - View API requests
- **Application/Storage** - View cookies
- **Console** - Run JavaScript

### External Tools (Optional)

- [JWT.io](https://jwt.io) - JWT decoder/encoder
- [Postman](https://www.postman.com/) - API testing
- [curl](https://curl.se/) - Command-line HTTP client
- [exiftool](https://exiftool.org/) - Metadata extraction

### Installing exiftool

```bash
# Windows (Download from website)
# https://exiftool.org/

# Mac
brew install exiftool

# Linux
sudo apt install exiftool
```

## 💡 General Tips

1. **Start with browser dev tools** - Press F12 and explore
2. **Read the hints** - Each lab has progressive hints
3. **Check cookies and headers** - Lots of info there
4. **Try common patterns** - admin/admin, id=1, etc.
5. **Google is your friend** - Look up techniques you don't know

## 🎓 Learning Path

**Beginner Path:**

1. Auth Misconfiguration (learn about default creds)
2. IDOR (understand access control)
3. Image Steganography (metadata basics)
4. Weak JWT (token manipulation)

**Speedrun Path:**
Try to complete all labs in under 30 minutes!

## 🆘 Need Help?

Each lab has its own README with:

- Detailed hints
- Step-by-step solutions
- Educational content
- Real-world examples

Check the lab's README.md file or the main README.md for more information.

## 🎉 After Completing

Once you've captured all flags:

- Review the code to understand the vulnerabilities
- Read the security best practices
- Try explaining the vulnerabilities to someone else
- Create your own CTF challenges!

---

**Ready? Let's hack! 🚩**

Start with: `cd auth_misconfiguration_lab && npm start`
