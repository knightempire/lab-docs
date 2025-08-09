# Introduction

<div class="guide-hero">
  <h1>Lab Equipment Management System (LEMS)</h1>
  <p class="subtitle">Your all-in-one platform for modern laboratory operations</p>
</div>

Welcome to the LEMS documentation! This guide will help you understand, install, and use our comprehensive laboratory management platform.

## 🔬 What is LEMS?

LEMS is a web-based platform designed to streamline the management of laboratory equipment, user requests, notifications, and administrative tasks. It provides a modern, user-friendly interface for both lab users and administrators.

## ✨ Key Features

<div class="feature-grid">
  <div class="feature-item">
    <span class="icon">🔐</span>
    <div>
      <strong>User Authentication</strong>
      <p>Secure login with role-based access control</p>
    </div>
  </div>
  <div class="feature-item">
    <span class="icon">📦</span>
    <div>
      <strong>Equipment Management</strong>
      <p>Track inventory, availability, and usage</p>
    </div>
  </div>
  <div class="feature-item">
    <span class="icon">⚡</span>
    <div>
      <strong>Request System</strong>
      <p>Streamlined workflow for equipment requests and returns</p>
    </div>
  </div>
  <div class="feature-item">
    <span class="icon">🔔</span>
    <div>
      <strong>Real-time Notifications</strong>
      <p>Instant alerts for important updates</p>
    </div>
  </div>
  <div class="feature-item">
    <span class="icon">📊</span>
    <div>
      <strong>Analytics Dashboard</strong>
      <p>Comprehensive reporting and analytics</p>
    </div>
  </div>
  <div class="feature-item">
    <span class="icon">📱</span>
    <div>
      <strong>Multi-device Support</strong>
      <p>Works on desktop, tablet, and mobile devices</p>
    </div>
  </div>
</div>

## 🏗️ System Architecture

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

## 📁 Repository Structure

<div class="repo-grid">
  <div class="repo-card">
    <span class="icon">⚙️</span>
    <strong>Backend</strong>
    <p>Node.js API, authentication, and business logic</p>
    <a href="https://github.com/knightempire/lab-backend">lab-backend →</a>
  </div>
  <div class="repo-card">
    <span class="icon">🎨</span>
    <strong>Frontend</strong>
    <p>Next.js app with React components and UI</p>
    <a href="https://github.com/knightempire/lab-frontend">lab-frontend →</a>
  </div>
</div>

## 👥 User Roles

<div class="roles-grid one-row">
  <div class="role-card">
    <span class="icon">👤</span>
    <strong>User</strong>
    <p>Students and researchers who request equipment</p>
  </div>
  <div class="role-card">
    <span class="icon">👨‍🏫</span>
    <strong>Faculty</strong>
    <p>Teachers with special permissions for equipment</p>
  </div>
  <div class="role-card">
    <span class="icon">⚙️</span>
    <strong>Admin</strong>
    <p>Administrators who manage the entire system</p>
  </div>
</div>

## 🛠️ Technology Stack

<div class="tech-stack-grid one-row">
  <div>
    <strong>Frontend</strong>
    <ul>
      <li>Next.js</li>
      <li>React</li>
      <li>Tailwind CSS</li>
      <li>JavaScript</li>
    </ul>
  </div>
  <div>
    <strong>Backend</strong>
    <ul>
      <li>Node.js</li>
      <li>Express.js</li>
      <li>MongoDB</li>
      <li>JWT/PASETO</li>
      <li>Nodemailer</li>
    </ul>
  </div>
  <div>
    <strong>DevOps & Tools</strong>
    <ul>
      <li>Docker</li>
      <li>GitHub</li>
      <li>ESLint</li>
      <li>PostCSS</li>
    </ul>
  </div>
</div>

## 🚀 Next Steps

<div class="next-steps-grid">
  <a class="next-step" href="/guide/quick-start">⚡ Quick Start Guide</a>
  <a class="next-step" href="/guide/installation">🔧 Installation Instructions</a>
  <a class="next-step" href="/frontend/">🎨 Frontend Documentation</a>
  <a class="next-step" href="/backend/">⚙️ Backend Documentation</a>
</div>

<style>
:root {
  --vp-bg: #18181b;
  --vp-bg-card: #232336;
  --vp-bg-card-alt: #232345;
  --vp-border: #232345;
  --vp-accent: #2563eb;
  --vp-text: #e0e7ff;
  --vp-text-muted: #a1a1aa;
}

.guide-hero {
  background: var(--vp-bg-card);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0 2.5rem 0;
  color: var(--vp-text);
  text-align: center;
  border: 1.5px solid var(--vp-border);
}
.guide-hero h1 { margin: 0 0 0.5rem 0; font-size: 2.2rem; font-weight: 700; }
.guide-hero .subtitle { font-size: 1.15rem; opacity: 0.92; }

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.2rem;
  margin: 2rem 0 2.5rem 0;
}
.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: var(--vp-bg-card);
  border: 1.5px solid var(--vp-border);
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  padding: 1.2rem 1.2rem 1.2rem 1.1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.feature-item:hover {
  border-color: var(--vp-accent);
  box-shadow: 0 8px 20px rgba(37,99,235,0.08);
}
.feature-item .icon {
  font-size: 1.7rem;
  margin-top: 0.1rem;
}
.feature-item strong { color: var(--vp-text); font-weight: 600; }
.feature-item p { margin: 0.2rem 0 0 0; color: var(--vp-text-muted); font-size: 0.95rem; }

.api-endpoint {
  background: var(--vp-bg-card-alt);
  border-left: 4px solid var(--vp-border);
  border-radius: 10px;
  padding: 1.5rem 1.5rem 1.5rem 1.2rem;
  margin: 2rem 0;
  color: var(--vp-text);
}
.api-endpoint h3 { margin: 0 0 0.5rem 0; }
.api-endpoint ul { margin: 0.5rem 0 0 1.2rem; }

.repo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}
.repo-card {
  background: var(--vp-bg-card);
  border: 1.5px solid var(--vp-border);
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  padding: 1.5rem;
  text-align: center;
  transition: border-color 0.2s, box-shadow 0.2s;
  color: var(--vp-text);
}
.repo-card:hover {
  border-color: var(--vp-accent);
  box-shadow: 0 8px 20px rgba(37,99,235,0.08);
}
.repo-card .icon { font-size: 1.5rem; margin-bottom: 0.5rem; display: block; }
.repo-card strong { color: var(--vp-text); font-size: 1.1rem; }
.repo-card p { color: var(--vp-text-muted); font-size: 0.95rem; margin: 0.5rem 0 1rem 0; }
.repo-card a { color: var(--vp-accent); text-decoration: none; font-weight: 600; }
.repo-card a:hover { text-decoration: underline; }

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  margin: 2rem 0 2.5rem 0;
}
.role-card {
  background: var(--vp-bg-card);
  border: 1.5px solid var(--vp-border);
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  padding: 1.2rem 1.2rem 1.2rem 1.1rem;
  text-align: center;
  transition: border-color 0.2s, box-shadow 0.2s;
  color: var(--vp-text);
}
.role-card:hover {
  border-color: var(--vp-accent);
  box-shadow: 0 8px 20px rgba(37,99,235,0.08);
}
.role-card .icon { font-size: 1.7rem; margin-bottom: 0.3rem; }
.role-card strong { color: var(--vp-text); font-weight: 600; font-size: 1.05rem; }
.role-card p { color: var(--vp-text-muted); font-size: 0.95rem; margin: 0.2rem 0 0 0; }

.tech-stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  margin: 2rem 0 2.5rem 0;
}
.tech-stack-grid strong { color: var(--vp-text); font-size: 1.05rem; }
.tech-stack-grid ul { margin: 0.5rem 0 0 1.2rem; color: var(--vp-text-muted); font-size: 0.95rem; }

.next-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  margin: 2.5rem 0 1.5rem 0;
}
.next-step {
  display: block;
  background: #232345;
  color: var(--vp-text);
  border-radius: 10px;
  padding: 1.2rem 1rem;
  text-align: center;
  font-weight: 600;
  text-decoration: none;
  font-size: 1.08rem;
  transition: border-color 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  border: 2px solid transparent;
}
.next-step:hover {
  border-color: var(--vp-accent);
  background: #232345;
  color: var(--vp-text);
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
}

.roles-grid.one-row, .tech-stack-grid.one-row {
  grid-template-columns: repeat(3, 1fr) !important;
}
@media (max-width: 900px) {
  .roles-grid.one-row, .tech-stack-grid.one-row {
    grid-template-columns: 1fr !important;
  }
}

.roles-grid.single-col, .tech-stack-grid.single-col {
  grid-template-columns: 1fr !important;
}

@media (max-width: 768px) {
  .guide-hero { padding: 1.2rem; }
  .feature-grid, .repo-grid, .next-steps-grid { grid-template-columns: 1fr; }
}

@media (prefers-color-scheme: dark) {
  :root {
    --vp-bg: #18181b;
    --vp-bg-card: #232336;
    --vp-bg-card-alt: #232345;
    --vp-border: #232345;
    --vp-accent: #2563eb;
    --vp-text: #e0e7ff;
    --vp-text-muted: #a1a1aa;
  }
  body, .vitepress-theme, .VPSidebar, .VPContent, .VPDoc, .VPNav {
    background: var(--vp-bg) !important;
    color: var(--vp-text) !important;
  }
}
</style>
