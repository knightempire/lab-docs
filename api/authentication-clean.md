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

### POST /api/auth/register

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "user"
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
  "message": "Registration successful"
}
```

## Logout

Invalidate the current user session.

### POST /api/auth/logout

### Headers

```
Authorization: Bearer <token>
```

### Response

```json
{
  "success": true,
  "message": "Logout successful"
}
```

### Example

```javascript
const logoutUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const result = await response.json();
    
    if (result.success) {
      localStorage.removeItem('token');
      return true;
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
```

## Refresh Token

Get a new access token using a refresh token.

### POST /api/auth/refresh

### Request Body

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Response

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  },
  "message": "Token refreshed successfully"
}
```

## Verify Token

Verify if the current token is valid.

### POST /api/auth/verify

### Headers

```
Authorization: Bearer <token>
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
    "tokenValid": true
  },
  "message": "Token is valid"
}
```

## Password Reset

Request a password reset for a user.

### POST /api/auth/forgot-password

### Request Body

```json
{
  "email": "user@example.com"
}
```

### Response

```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

### Reset Password

### POST /api/auth/reset-password

### Request Body

```json
{
  "token": "reset-token-from-email",
  "newPassword": "newPassword123"
}
```

### Response

```json
{
  "success": true,
  "message": "Password reset successful"
}
```

## Error Responses

Common error responses for authentication endpoints:

### 401 Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid credentials"
  }
}
```

### 400 Bad Request

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": "Valid email is required",
      "password": "Password must be at least 8 characters"
    }
  }
}
```

### 409 Conflict

```json
{
  "success": false,
  "error": {
    "code": "USER_EXISTS",
    "message": "User with this email already exists"
  }
}
```

## Rate Limiting

Authentication endpoints have specific rate limits:

- **Login**: 5 attempts per minute per IP
- **Register**: 3 attempts per minute per IP
- **Password Reset**: 1 attempt per minute per email

### Rate Limit Headers

```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 4
X-RateLimit-Reset: 1609459200
```

## Security Headers

All authentication responses include security headers:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## Authentication Flow

### Standard Flow

1. **Login** → Receive `token` and `refreshToken`
2. **Use token** in `Authorization` header for API requests
3. **Refresh token** when it expires
4. **Logout** to invalidate tokens

### Token Storage

#### Frontend (Recommended)

```javascript
// Store tokens securely
const storeTokens = (tokens) => {
  // Use httpOnly cookies for production
  localStorage.setItem('token', tokens.token);
  localStorage.setItem('refreshToken', tokens.refreshToken);
};

// Retrieve tokens
const getToken = () => localStorage.getItem('token');
const getRefreshToken = () => localStorage.getItem('refreshToken');

// Clear tokens
const clearTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};
```

#### Axios Interceptor Example

```javascript
// Add token to all requests
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post('/api/auth/refresh', {
            refreshToken
          });
          const { token } = response.data.data;
          localStorage.setItem('token', token);
          // Retry original request
          return axios(error.config);
        } catch (refreshError) {
          clearTokens();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
```
