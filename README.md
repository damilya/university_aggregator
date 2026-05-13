# University Aggregator

A website aggregating top worldwide universities with admission requirements and filters.

## Stack

- **Frontend**: React + TypeScript + Tailwind CSS → Netlify
- **Backend**: Node.js + Express + TypeScript + SQLite → Railway

## Development

### Backend
cd backend
npm install
npm run seed
npm run dev   # runs on http://localhost:3001

### Frontend
cd frontend
npm install
npm run dev   # runs on http://localhost:5173

## Environment Variables

### Backend
Copy `backend/.env.example` to `backend/.env`

### Frontend
Set `VITE_API_URL` to your Railway backend URL in Netlify environment settings.

## Deployment

- Frontend: connect this repo to Netlify, set build command `npm run build`, publish dir `dist` (inside `frontend/`)
- Backend: connect `backend/` to Railway, it auto-detects Node.js
