# 🔐 Authentication Misconfiguration Lab

## Overview

This CTF lab demonstrates the security risks of using default credentials in web applications. Many systems are deployed with default admin accounts that are never changed, creating a critical security vulnerability.

## Vulnerability Type

**CWE-798: Use of Hard-coded Credentials**

This lab simulates a common real-world scenario where administrators fail to change default credentials after deployment.

## Learning Objectives

- Understand the importance of changing default credentials
- Learn about common authentication misconfigurations
- Practice credential enumeration techniques
- Explore admin endpoints and privilege escalation

## Challenge Details

- **Port:** 4000
- **Difficulty:** Easy
- **Objective:** Capture the flag from the admin endpoint

## Setup

```bash
npm install
npm start
```

Access the lab at: http://localhost:4000

## Getting Started

1. You're provided with a regular user account: `guest / guest`
2. Log in and explore the application
3. Find a way to access the admin panel
4. Retrieve the flag from `/api/admin/flag`

## Hints

<details>
<summary>Hint 1 (Click to reveal)</summary>

Try common default credentials. What are typical admin usernames and passwords?

</details>

<details>
<summary>Hint 2 (Click to reveal)</summary>

The admin username is "admin". What about common default passwords?

</details>

<details>
<summary>Hint 3 (Click to reveal)</summary>

Try logging in with: `admin / admin`

</details>

## API Endpoints

- `POST /api/login` - Login endpoint
- `POST /api/logout` - Logout endpoint
- `GET /api/me` - Get current user info (requires authentication)
- `GET /api/admin/flag` - Admin-only endpoint (returns the flag)

## Real-World Impact

Default credentials are a critical vulnerability that has led to:

- Massive data breaches
- Ransomware attacks
- Unauthorized system access
- Complete infrastructure compromise

**Famous Examples:**

- Mirai botnet (default IoT credentials)
- Many router and camera breaches
- Corporate network intrusions

## Mitigation

To prevent this vulnerability:

1. **Never use default credentials in production**
2. Force password changes on first login
3. Use strong, unique passwords
4. Implement account lockout policies
5. Use multi-factor authentication (MFA)
6. Regular security audits for default accounts

## Code Walkthrough

The vulnerable code can be found in `server.js`:

```javascript
const ADMIN_CREDS = {
  username: "admin",
  password: "admin", // ⚠️ Default credentials
};
```

## References

- [OWASP - Default Passwords](https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_password)
- [CWE-798](https://cwe.mitre.org/data/definitions/798.html)
- [NIST Password Guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html)

---

**Happy Hacking! 🚩**
