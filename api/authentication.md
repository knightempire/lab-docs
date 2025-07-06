# Authentication API

Authentication endpoints for user login, registration, and token management.

## Login

Authenticate a user and receive access tokens.

### POST /api/auth/login

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  },
  "message": "Login successful"
}
```

### Example

```javascript
const loginUser = async (email, password) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Store token in localStorage or cookie
      localStorage.setItem('token', result.data.token);
      return result.data.user;
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

## Register

Create a new user account.

<div class="api-endpoint">
  <h3>POST /api/auth/register</h3>
</div>

### Request Body

<div class="code-block">
<pre><code>{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "user"
}
</code></pre>
</div>

### Response

<div class="code-block">
<pre><code>{
  "success": true,
  "data": {
    "user": {
      "id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "user",
      "isEmailVerified": false
    }
  },
  "message": "Registration successful. Please check your email for verification."
}
</code></pre>
</div>

## Refresh Token

Get a new access token using a refresh token.

<div class="api-endpoint">
  <h3>POST /api/auth/refresh</h3>
</div>

### Request Body

<div class="code-block">
<pre><code>{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
</code></pre>
</div>

### Response

<div class="code-block">
<pre><code>{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  },
  "message": "Token refreshed successfully"
}
</code></pre>
</div>

## Logout

Invalidate the current session and tokens.

<div class="api-endpoint">
  <h3>POST /api/auth/logout</h3>
  <span class="badge badge-warning">Requires Authentication</span>
</div>

### Headers

<div class="code-block">
<pre><code>Authorization: Bearer &lt;your-token&gt;
</code></pre>
</div>

### Response

<div class="code-block">
<pre><code>{
  "success": true,
  "message": "Logout successful"
}
</code></pre>
</div>

## Forgot Password

Initiate password reset process.

<div class="api-endpoint">
  <h3>POST /api/auth/forgot-password</h3>
</div>

### Request Body

<div class="code-block">
<pre><code>{
  "email": "user@example.com"
}
</code></pre>
</div>

### Response

<div class="code-block">
<pre><code>{
  "success": true,
  "message": "Password reset email sent successfully"
}
</code></pre>
</div>

## Reset Password

Reset password using the reset token.

<div class="api-endpoint">
  <h3>POST /api/auth/reset-password</h3>
</div>

### Request Body

<div class="code-block">
<pre><code>{
  "token": "reset-token-from-email",
  "password": "newpassword123",
  "confirmPassword": "newpassword123"
}
</code></pre>
</div>

### Response

<div class="code-block">
<pre><code>{
  "success": true,
  "message": "Password reset successful"
}
</code></pre>
</div>

## Error Codes

| Code | Description |
|------|-------------|
| `INVALID_CREDENTIALS` | Invalid email or password |
| `USER_NOT_FOUND` | User does not exist |
| `EMAIL_ALREADY_EXISTS` | Email is already registered |
| `INVALID_TOKEN` | Token is invalid or expired |
| `PASSWORD_MISMATCH` | Passwords do not match |
| `WEAK_PASSWORD` | Password does not meet requirements |

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt
- **JWT Tokens**: Secure token-based authentication
- **PASETO Support**: Modern token format support
- **Rate Limiting**: Login attempts are rate-limited
- **Email Verification**: Optional email verification
- **Password Reset**: Secure password reset via email
