# Contributing to CTF Labs

Thank you for your interest in contributing to CTF Labs! We welcome contributions from the community.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug (excluding intentional vulnerabilities):

1. Check if the issue already exists
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (OS, Node version)

### Suggesting New Labs

We're always looking for new CTF challenges! To suggest a new lab:

1. Open an issue with the "new lab" label
2. Describe the vulnerability type
3. Explain the learning objectives
4. Provide implementation ideas if possible

### Submitting Code

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/ctf-labs.git
   cd ctf-labs
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Test your changes thoroughly
   - Add comments for complex logic

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Include testing instructions

## 📋 New Lab Checklist

When creating a new lab, ensure:

- [ ] Lab runs on a unique port
- [ ] Dependencies are minimal and well-documented
- [ ] Code includes comments explaining the vulnerability
- [ ] A README or documentation explains the challenge
- [ ] The lab has clear hints and learning objectives
- [ ] Vulnerability is realistic and educational
- [ ] Flag format is consistent with other labs
- [ ] package.json includes proper metadata

## 🎨 Code Style

- Use 2 spaces for indentation
- Use meaningful variable names
- Comment intentional vulnerabilities with `⚠️ VULNERABILITY:`
- Keep code readable and educational
- Follow Node.js best practices (except where intentionally vulnerable)

## 🧪 Testing

Before submitting:

1. Test the lab from a fresh install
2. Verify the vulnerability is exploitable
3. Ensure the flag is obtainable
4. Check that hints are helpful but not too revealing
5. Test on multiple browsers if applicable

## 📝 Documentation

- Update README.md if adding new labs
- Include setup instructions
- Document any special requirements
- Provide hints without giving away the solution

## 🚀 Lab Structure

Each lab should follow this structure:

```
lab_name/
├── server.js           # Main server file
├── package.json        # Dependencies and scripts
├── public/            # Static files (HTML, CSS, JS)
│   ├── index.html
│   └── style.css
└── README.md          # Lab-specific documentation (optional)
```

## ⚠️ Security Note

Remember: These are intentionally vulnerable applications for educational purposes.

- Clearly mark vulnerabilities in code
- Include warnings in documentation
- Never use real credentials or sensitive data
- Test in isolated environments only

## 📞 Questions?

Feel free to open an issue for any questions or discussions!

## 🙏 Thank You

Every contribution helps make security education more accessible. Thank you for helping improve CTF Labs!
