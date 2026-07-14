# ServiceDesk

> A full-stack IT service desk application inspired by Freshservice that enables organizations to manage support tickets through role-based workflows.

![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![Express](https://img.shields.io/badge/Express-Backend-000000)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)

---

# Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Database Design](#database-design)
- [Authorization](#authorization)
- [API Overview](#api-overview)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Lessons Learned](#lessons-learned)
- [Author](#author)

---

# Overview

## Motivation

<!-- Why did you build this project? -->

## Description

<!-- Brief overview of what the application does -->

## Problem Solved

<!-- What real-world problem does this solve? -->

---

# Live Demo

**Frontend:** <!-- Link -->

**Backend API:** <!-- Link -->

**GitHub Repository:** <!-- Link -->

---

# Screenshots

## Login

<!-- Image -->

---

## Requester Dashboard

<!-- Image -->

---

## Agent Dashboard

<!-- Image -->

---

## Admin Dashboard

<!-- Image -->

---

## Ticket Details

<!-- Image -->

---

# Features

## Authentication

- [ ] User Registration
- [ ] Login
- [ ] JWT Authentication
- [ ] Protected Routes

## Authorization

- [ ] Requester
- [ ] Agent
- [ ] Admin

## Ticket Management

- [ ] Create Ticket
- [ ] Update Ticket
- [ ] Assign Ticket
- [ ] Close Ticket
- [ ] Reopen Ticket

## Comments

- [ ] Public Comments
- [ ] Internal Notes

## Search

- [ ] Search
- [ ] Filters
- [ ] Sorting

## Other

- [ ] Activity Log
- [ ] Pagination
- [ ] Responsive Design

---

# Tech Stack

## Frontend

- React
- React Router
- CSS
- <!-- Other -->

## Backend

- Node.js
- Express.js
- JWT
- bcrypt
- <!-- Other -->

## Database

- PostgreSQL

## Testing

- Jest
- Supertest

## Deployment

- Frontend:
- Backend:
- Database:

---

# Architecture

## High-Level Architecture

<!-- Insert architecture diagram -->

```
Browser
    |
React Frontend
    |
 REST API
    |
Express Backend
    |
PostgreSQL
```

---

## Request Flow

<!-- Optional sequence diagram -->

---

# Database Design

## Entity Relationship Diagram

<!-- Insert ER Diagram -->

---

## Database Schema

### Users

| Column | Type | Description |
| ------ | ---- | ----------- |
|        |      |             |

### Tickets

| Column | Type | Description |
| ------ | ---- | ----------- |
|        |      |             |

### Comments

| Column | Type | Description |
| ------ | ---- | ----------- |
|        |      |             |

### Locations

| Column | Type | Description |
| ------ | ---- | ----------- |
|        |      |             |

---

# Authorization

| Action             | Requester | Agent | Admin |
| ------------------ | :-------: | :---: | :---: |
| Create Ticket      |           |       |       |
| View Own Tickets   |           |       |       |
| View All Tickets   |           |       |       |
| Assign Ticket      |           |       |       |
| Change Status      |           |       |       |
| Add Public Comment |           |       |       |
| Add Internal Note  |           |       |       |
| Manage Users       |           |       |       |

---

# API Overview

## Authentication

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST   |          |             |
| POST   |          |             |

---

## Tickets

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET    |          |             |
| POST   |          |             |
| PATCH  |          |             |
| DELETE |          |             |

---

## Comments

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET    |          |             |
| POST   |          |             |
| PATCH  |          |             |

---

## Users

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET    |          |             |
| PATCH  |          |             |

---

## Locations

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET    |          |             |

---

# Project Structure

```text
ServiceDesk/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── routes/
│   ├── tests/
│   ├── utils/
│   ├── app.js
│   └── package.json
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Backend

```bash
cd backend
npm install
npm start
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Environment Variables

## Backend

```env
DATABASE_URL=
JWT_SECRET=
PORT=
```

## Frontend

```env
VITE_API_URL=
```

---

# Usage

## Demo Accounts

### Admin

Email:

Password:

---

### Agent

Email:

Password:

---

### Requester

Email:

Password:

---

# Testing

## Backend Tests

```bash
npm test
```

## Coverage

<!-- Add coverage screenshot or percentage -->

---

# Deployment

| Service  | Provider |
| -------- | -------- |
| Frontend |          |
| Backend  |          |
| Database |          |

---

# Future Improvements

- [ ] File Uploads
- [ ] Email Notifications
- [ ] SLA Tracking
- [ ] Analytics Dashboard
- [ ] Real-time Notifications
- [ ] AI Ticket Categorization
- [ ] Knowledge Base
- [ ] Dark Mode

---

# Lessons Learned

## Biggest Technical Challenges

-

-

-

## What I Learned

-

-

-

## What I'd Improve

-

-

- ***

# Author

**Name**

GitHub:

LinkedIn:

Portfolio:

Email:

---

# License

This project is licensed under the MIT License.
