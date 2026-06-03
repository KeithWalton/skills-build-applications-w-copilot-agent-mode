# OctoFit Tracker

Multi-tier application for activity tracking, team management, and competitive leaderboards.

## Project Structure

```
octofit-tracker/
├── backend/           # Node.js + Express + TypeScript API
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
└── frontend/          # React 19 + Vite
    ├── src/
    ├── package.json
    └── vite.config.ts
```

## Getting Started

### Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### Start Development Servers

```bash
# Backend (port 8000)
cd backend
npm run dev

# Frontend (port 5173)
cd frontend
npm run dev

# MongoDB (port 27017)
mongod
```

## Stack

- **Frontend**: React 19, Vite, react-router-dom, Bootstrap
- **Backend**: Node.js, Express, TypeScript, Mongoose
- **Database**: MongoDB
