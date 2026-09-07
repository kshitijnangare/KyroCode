# ⚔️ KyroCode

KyroCode is a full-scale competitive programming platform built to test both algorithmic knowledge and real-world engineering skills. 

Unlike standard platform clones, KyroCode features a **self-hosted Judge0 execution engine**, real-time contest leaderboards powered by Redis, an actual Elo rating system, and a unique **Real-World Problems** category (testing mock APIs, dirty data processing, and race conditions).

---
> 🚧 **Project Status:** KyroCode is currently under **active development**. Core execution, contest engine, and data structures are implemented, while advanced real-world categories and social features are being incrementally deployed.

## 📊 Feature Implementation Tracker

| Feature / Module | Status | Details |
| :--- | :--- | :--- |
| **Monaco Code Editor** | 🟢 Completed | Multi-language support with theme configuration |
| **BullMQ Async Execution** | 🟢 Completed | Worker queue for non-blocking submission handling |
| **Self-Hosted Judge0 Engine** | 🟢 Completed | Dockerized sandboxed code execution pipeline |
| **PostgreSQL & Schema Setup** | 🟢 Completed | Relational models for users, problems, and submissions |
| **Redis Real-time Leaderboards** | 🟢 Completed | $O(\log N)$ ranking updates via Redis ZSETs |
| **JWT & Refresh Token Auth** | 🟢 Completed | Secure login, token rotation, and email verification flow |
| **Real-World Problems Engine** | 🟡 In Progress | Mock APIs, dirty data processing, and concurrency tests |
| **Socket.IO Chat & Live Contests** | 🟡 In Progress | Multi-room event streaming and real-time contest synchronization |
| **Behavioral Economy & AI Hints** | 🔴 Planned | In-app coin economy, streaks, and LLM-assisted hints |
| **GitHub-style Heatmaps & Feed** | 🔴 Planned | Activity analytics, social feed, and follower graph |

---

## ✨ Key Features

*   **Self-Hosted Execution Engine:** Code evaluation runs in sandboxed Docker containers via a self-hosted Judge0 instance. Submissions are processed asynchronously using **BullMQ**, ensuring the system doesn't crash during contest submission spikes.
*   **Real-World Problems Category:** Goes beyond standard DSA. Tests production engineering skills like exponential backoff retries, large-scale log parsing, and concurrency handling.
*   **Real-Time Contests & Elo Ratings:** Live leaderboards powered by **Redis Sorted Sets (ZSET)** for $O(\log N)$ instant ranking. Participants receive post-contest rating adjustments based on a mathematical Elo formula.
*   **Behavioral Economy:** An integrated coin system where users earn currency through problem-solving and daily streaks, which can be spent on AI-driven hints or editorials.
*   **Social & Analytics Layer:** Includes an activity feed, real-time chat (Socket.IO), follower mechanics, and a GitHub-style submission heatmap.
*   **Public API (Codolio-Compatible):** Exposes a public developer stats endpoint, demonstrating API design maturity and ecosystem integration.

---

## 🛠 Tech Stack

### Frontend
*   **React.js + Vite:** Fast, modern UI development.
*   **TailwindCSS:** Utility-first styling.
*   **Monaco Editor:** The core editor powering VS Code (syntax highlighting, multi-language support).
*   **TanStack Query (React Query):** Server state management and caching.
*   **Socket.IO Client:** Real-time contest updates and chat.
*   **Recharts & React-Calendar-Heatmap:** Data visualization for ratings and activity streaks.

### Backend
*   **Node.js + Express.js:** RESTful API architecture.
*   **Socket.IO Server:** Real-time bidirectional event streaming.
*   **BullMQ:** Async job queue for reliable code submission processing.
*   **node-cron:** Scheduled tasks (Problem of the Day, contest lifecycle management).
*   **JWT + Bcrypt:** Secure authentication with short-lived access and long-lived refresh tokens.

### Infrastructure & Databases
*   **PostgreSQL:** Primary relational database (Users, Problems, Submissions, Contests, Ledger).
*   **MongoDB:** Document store for high-volume, unstructured data (Activity Feed, Chat).
*   **Redis:** High-performance in-memory store for BullMQ, rate limiting, and real-time leaderboards.
*   **Judge0 CE (Docker):** Open-source, robust code execution engine.
*   **Nginx:** Reverse proxy for routing and WebSocket upgrade headers.

---

## 🏗 System Architecture

```text
┌─────────────────────────────────────────────┐
│              React Frontend                 │
│    Monaco Editor | Socket.IO | Tailwind     │
└──────────────────┬──────────────────────────┘
                   │ HTTPS + WSS
                   ▼
┌─────────────────────────────────────────────┐
│           Nginx Reverse Proxy               │
└──────────────────┬──────────────────────────┘
                   │
          ┌────────┴────────┐
          ▼                 ▼
┌──────────────────┐  ┌─────────────────────┐
│   Node/Express   │  │  Socket.IO Server   │
│   REST API       │  │  (Real-time rooms)  │
└────────┬─────────┘  └─────────────────────┘
         │
         ▼
┌──────────┐                 ┌────────────┐
│  BullMQ  │◄────────────────│   Redis    │
│  Queue   │                 │ (ZSET rank)│
└────┬─────┘                 └────────────┘
     │
     ▼
┌──────────────────┐         ┌────────────────┐
│ Submission Worker│────────►│   Judge0 CE    │
│ (Node.js)        │         │ (Docker Sandbox│
└────────┬─────────┘         └────────────────┘
         │
         ▼
┌──────────────────┐         ┌────────────────┐
│   PostgreSQL     │         │    MongoDB     │
│ (Structured Data)│         │ (Feed & Chat)  │
└──────────────────┘         └────────────────┘
```


## 🚀 Getting Started (Local Development)

### 1. Prerequisites
- Node.js (v18+)
- Docker & Docker Compose (for Judge0, Redis, Postgres, MongoDB)
- Git

### 2. Clone the repository

```git clone https://github.com/kshitijnangare/KyroCode.git```

```cd KyroCode```

### 3. Infrastructure Setup (Docker)
- Start the execution engine and databases:
- Navigate to the infra directory 
```(assuming docker-compose.yml is here)```
```
cd infra
docker-compose up -d
```
- This spins up PostgreSQL, MongoDB, Redis, and Judge0 CE on their respective ports.

### 4. Backend Setup
```
cd ../backend
npm install
```

Create your .env file
```
cp .env.example .env
```

Run database migrations
```
npm run migrate
```

Start the development server
```
npm run dev
```

### 5. Frontend Setup
```
cd ../frontend
npm install
```
Create your .env file
```
cp .env.example .env
```

Start the Vite development server
```
npm run dev
```
---

## 📜 Core API Routes
### Code Execution
- ```POST /api/submissions``` - Push code to BullMQ for execution.
- ```POST /api/submissions/run``` - Run against sample test cases only.
- ```GET /api/submissions/:id``` - Poll/retrieve execution results.

### Contests
- ```GET /api/contests/:slug``` - Fetch contest details.
- ```GET /api/contests/:id/leaderboard``` - Fetch real-time Redis leaderboard.

### Public API
- ```GET /api/users/:username/stats``` - Exposes public metrics (Codolio-compatible).
