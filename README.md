# 🚩 CTF Labs Collection

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)

A modular platform for hosting web security Capture The Flag (CTF) challenges. Learn and practice common web vulnerabilities in a safe, isolated environment.

> ⚠️ **Educational Use Only**: These applications contain intentional security vulnerabilities for learning purposes. Never deploy to production or test on unauthorized systems.

## 🎯 Overview

CTF Labs is a collection of deliberately vulnerable web applications designed for security education. Each lab focuses on a specific vulnerability class, allowing learners to practice exploitation techniques and understand security concepts hands-on.

## 🧪 Current Labs

| Lab                                                 | Port | Vulnerability Type     | Difficulty  |
| --------------------------------------------------- | ---- | ---------------------- | ----------- |
| [Auth Misconfiguration](auth_misconfiguration_lab/) | 4000 | Default Credentials    | ⭐ Easy     |
| [IDOR Challenge](idor_ctf_lab/)                     | 3001 | Access Control         | ⭐ Easy     |
| [Weak JWT Auth](weak_jwt_auth_lab/)                 | 6000 | Token Security         | ⭐⭐ Medium |
| [Image Steganography](image_stegnography_lab/)      | 7000 | Information Disclosure | ⭐ Easy     |

Each lab includes detailed documentation, progressive hints, and real-world context.

## 🚀 Quick Start

### Prerequisites

- Node.js (v14.x or higher)
- npm (comes with Node.js)

### Automated Setup

**Windows:**

```powershell
.\setup.ps1
```

**Linux/Mac:**

```bash
chmod +x setup.sh
./setup.sh
```

### Manual Setup

```bash
# Install dependencies for all labs
cd auth_misconfiguration_lab && npm install && cd ..
cd idor_ctf_lab && npm install && cd ..
cd weak_jwt_auth_lab && npm install && cd ..
cd image_stegnography_lab && npm install && cd ..

# Generate steganography challenge
cd image_stegnography_lab && npm run generate && cd ..
```

### Run a Lab

```bash
cd <lab_name>
npm start
```

Access the lab at the corresponding port (see table above).

## 📚 Learning Path

**Recommended Order:**

1. **Auth Misconfiguration** - Understand credential security
2. **IDOR** - Learn access control basics
3. **Image Steganography** - Explore metadata analysis
4. **Weak JWT** - Master token manipulation

Each lab builds foundational security knowledge applicable to real-world scenarios.

## 🛠️ Essential Tools

- **Browser DevTools** (F12) - Inspect requests, cookies, and responses
- **[JWT.io](https://jwt.io)** - Decode and manipulate JWT tokens
- **curl/Postman** - API testing and request crafting
- **exiftool** - Metadata extraction (steganography lab)

## 🎓 What You'll Learn

- Authentication vs. Authorization
- Common API security flaws
- JWT structure and vulnerabilities
- Access control best practices
- Information disclosure risks
- Secure coding principles

## 🤝 Contributing

We welcome new labs and improvements! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Lab Ideas:**

- SQL Injection
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- Command Injection
- Race Conditions
- File Upload Vulnerabilities

## ⚠️ Security Notice

**Critical Reminders:**

- These labs are **intentionally vulnerable**
- Run only in **isolated environments**
- **Never** deploy to production networks
- Practice **ethical hacking** only
- Obtain **authorization** before security testing

## 📝 License

MIT License - See [LICENSE](LICENSE) for details.

## 🆘 Support

- Check individual lab READMEs for detailed walkthroughs
- Review [QUICKSTART.md](QUICKSTART.md) for setup help
- Open an issue for bugs or questions

---

**Ready to hack?** Start with: `cd auth_misconfiguration_lab && npm start`

🚩 Happy Learning!
