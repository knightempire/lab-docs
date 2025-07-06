# Backend Overview

The LEMS backend is built with Node.js and Express.js, providing a robust REST API with MongoDB for data persistence.

## Architecture

### 🏗️ Backend Architecture

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT and PASETO tokens
- **Email**: Nodemailer for notifications

## Project Structure

```
backend/
├── controllers/           # Request handlers
│   ├── auth/             # Authentication controllers
│   ├── admin/            # Admin-specific controllers
│   ├── product.controllers.js
│   ├── request.controllers.js
│   ├── notification.controllers.js
│   └── user.controllers.js
├── models/               # Database models
│   ├── user.model.js
│   ├── product.model.js
│   ├── request.model.js
│   └── notification.model.js
├── routers/              # Route definitions
│   ├── auth.js
│   ├── products.js
│   ├── requests.js
│   └── users.js
├── middleware/           # Custom middleware
│   ├── auth/            # Authentication middleware
│   ├── validation/      # Request validation
│   ├── error/          # Error handling
│   └── logging/        # Request logging
├── config/              # Configuration files
│   ├── database.js
│   ├── jwt.js
│   └── email.js
├── utils/               # Utility functions
├── app.js              # Express app setup
└── server.js           # Server entry point
```

## Core Features

### 🔐 Authentication & Authorization
- **JWT Tokens**: Secure session management
- **PASETO Support**: Modern token format
- **Role-based Access**: User, Faculty, Admin roles
- **Password Security**: bcrypt hashing with salt
- **Rate Limiting**: Prevent brute force attacks

### 📊 Data Management
- **MongoDB Integration**: NoSQL database with Mongoose
- **Data Validation**: Schema validation and sanitization
- **Indexing**: Optimized queries for performance
- **Aggregation**: Complex data analysis and reporting

### 📧 Notification System
- **Email Notifications**: Automated email alerts
- **Real-time Updates**: WebSocket integration (planned)
- **Template System**: Customizable email templates
- **Queue Management**: Background job processing

## Database Schema

### User Model

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'faculty', 'admin'],
    default: 'user'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});
```

### Product Model

```javascript
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  availableQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['available', 'maintenance', 'discontinued'],
    default: 'available'
  },
  specifications: {
    type: Map,
    of: String
  },
  images: [String],
  location: String,
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});
```

## API Middleware

### Authentication Middleware

```javascript
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: { message: 'Access token required' }
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid token or user inactive' }
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: { message: 'Invalid token' }
    });
  }
};
```

### Role Authorization

```javascript
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: { message: 'Insufficient permissions' }
      });
    }
    next();
  };
};

// Usage
router.get('/admin/users', authenticateToken, authorize('admin'), getUserList);
```

## Error Handling

### Global Error Handler

```javascript
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  // Log error
  console.error(err);
  
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }
  
  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }
  
  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message || 'Server Error'
    }
  });
};
```

## Email Service

### Nodemailer Configuration

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (options) => {
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.html
  };
  
  const info = await transporter.sendMail(message);
  console.log('Message sent: %s', info.messageId);
};
```

## Security Features

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/auth/login', authLimiter);
```

### Input Validation

```javascript
const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().isLength({ min: 2 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: { message: 'Validation failed', details: errors.array() }
      });
    }
    next();
  }
];
```

## Performance Optimization

### Database Indexing

```javascript
// Create indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1, isActive: 1 });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ name: 'text', description: 'text' });
```

### Caching Strategy

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cached = cache.get(key);
    
    if (cached) {
      return res.json(cached);
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.set(key, body, duration);
      res.sendResponse(body);
    };
    
    next();
  };
};
```

## Next Steps

- [Controllers](/backend/controllers) - Learn about request handlers
- [Models](/backend/models) - Understand data models
- [Middleware](/backend/middleware) - Explore custom middleware
- [Database](/backend/database) - Database setup and optimization
