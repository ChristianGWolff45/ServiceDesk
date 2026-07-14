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

I built ServiceDesk with two primary goals in mind.

First, I wanted to solve a real problem. My help desk previously relied on a basic ticketing process that lacked many of the features found in modern service management platforms. ServiceDesk was created as a more robust and user-friendly solution, providing role-based access control, ticket assignment, comments, activity tracking, and a structured workflow inspired by enterprise tools like Freshservice.

Second, I wanted to deepen my understanding of full-stack software development by building a technically challenging application from the ground up. As the Director of Technical Development for my fraternity, Kappa Theta Pi, it is my responsiblity to mentor and teach new members modern full-stack development practices. I wanted to build this project to better understand the tech stack I would be teaching.

## Description

ServiceDesk is a full-stack IT service management application inspired by modern help desk platforms such as Freshservice. It enables requesters to submit and track technical support tickets, while providing agents with the tools to review, assign, prioritize, and move tickets through a structured workflow. Agents can communicate with requesters through public comments and collaborate internally using private notes.

Administrators have full system management capabilities, including creating and managing user accounts, assigning roles, deactivating users, resetting passwords, and overseeing the overall support workflow. By combining role-based access control, secure authentication, and ticket lifecycle management, ServiceDesk provides a centralized platform for efficiently managing technical support requests.

## Problem Solved

My help desk previously relied on a deprecated ticketing application hosted on an internal webpage. The system was difficult to navigate, poorly organized, and made it challenging for both technicians and users to communicate effectively or keep track of support requests. Finding ticket information, following conversations, and managing the ticket lifecycle required unnecessary effort, leading to an inefficient support experience.

ServiceDesk was built to address these shortcomings by providing a modern, intuitive web application tailored to the needs of our help desk. The application centralizes ticket management with a clean user interface, structured workflows, role-based access control, public and internal messaging, and improved visibility into ticket status and history. The result is a faster, more organized, and more collaborative support process for both requesters and support staff.

---

# Live Demo

**Application:** [ServiceDesk](https://service-desk-three-eta.vercel.app/)

**Backend API:** [Render API](https://servicedesk-c5s8.onrender.com/)

**GitHub Repository:** [GitHub Repository](https://github.com/ChristianGWolff45/ServiceDesk)

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
