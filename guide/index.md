# Introduction

Welcome to the Lab Equipment Management System (LEMS) documentation. This guide will help you understand, install, and use our comprehensive laboratory management platform.

## What is LEMS?

LEMS is a web-based platform designed to streamline the management of laboratory equipment, user requests, notifications, and administrative tasks. It provides a modern, user-friendly interface for both lab users and administrators.

## Key Features

- **User Authentication**: Secure login with role-based access control
- **Equipment Management**: Track inventory, availability, and usage
- **Request System**: Streamlined workflow for equipment requests and returns
- **Real-time Notifications**: Instant alerts for important updates
- **Analytics Dashboard**: Comprehensive reporting and analytics
- **Multi-device Support**: Works on desktop, tablet, and mobile devices

## System Architecture

<div class="api-endpoint">
  <h3>🏗️ Architecture Overview</h3>
  <p>LEMS follows a modern microservices architecture with separate frontend and backend repositories:</p>
  <ul>
    <li><strong>Frontend</strong>: Next.js application with React components</li>
    <li><strong>Backend</strong>: Node.js/Express.js REST API</li>
    <li><strong>Database</strong>: MongoDB for data persistence</li>
    <li><strong>Authentication</strong>: JWT/PASETO token-based security</li>
  </ul>
</div>

## Repository Structure

The project is split into two main repositories:

- **Backend**: [lab-backend](https://github.com/knightempire/lab-backend)
- **Frontend**: [lab-frontend](https://github.com/knightempire/lab-frontend)

## User Roles

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
  <div class="feature-card">
    <h3 class="text-lg font-semibold mb-2">👤 User</h3>
    <p class="text-sm text-gray-600">Students and researchers who request equipment</p>
  </div>
  <div class="feature-card">
    <h3 class="text-lg font-semibold mb-2">👨‍🏫 Faculty</h3>
    <p class="text-sm text-gray-600">Teachers with special permissions for equipment</p>
  </div>
  <div class="feature-card">
    <h3 class="text-lg font-semibold mb-2">⚙️ Admin</h3>
    <p class="text-sm text-gray-600">Administrators who manage the entire system</p>
  </div>
</div>

## Technology Stack

### Frontend Technologies
- **Next.js**: React framework for server-side rendering
- **React**: Component-based UI library
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript**: Primary programming language

### Backend Technologies
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **JWT/PASETO**: Authentication tokens
- **Nodemailer**: Email service integration

### DevOps & Tools
- **Docker**: Containerization platform
- **GitHub**: Version control and collaboration
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing tool

## Next Steps

Ready to get started? Check out our [Quick Start Guide](/guide/quick-start) or dive into the [Installation Instructions](/guide/installation).

For developers, explore the [Frontend Documentation](/frontend/) or [Backend Documentation](/backend/) to understand the codebase structure.
