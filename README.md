# Poller

A simple polling web app where anyone can create polls, vote on them, and see results.

## What It Does

- **Create Polls**: Make polls with a title, description, multiple choice options, and tags
- **Vote**: Click on options to vote and see results update in real-time
- **Filter by Tags**: Find polls by clicking on tag filters
- **Delete Polls**: Remove polls you no longer need
- **View Results**: See bar charts showing how many votes each option got

## How It's Built

### Backend (Go)
- **Go 1.20** - Programming language
- **Fiber** - Fast web framework for handling HTTP requests
- **Go-Playground Validator** - Validates poll data before saving
- **In-Memory Storage** - Polls are stored in memory (no database needed for demo)

### Frontend (Next.js)
- **Next.js 13** - React framework for building web apps
- **React 18** - UI library
- **TypeScript** - Adds type safety to JavaScript
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Mantine** - UI component library for forms, badges, and modals
- **SWR** - React hook for fetching data with automatic caching and revalidation

## Project Structure

```
poller/
├── client/                 # Frontend (Next.js)
│   ├── src/
│   │   ├── components/    # React components (PollCard, BarChart, etc.)
│   │   ├── pages/        # Next.js pages (routes)
│   │   └── types/        # TypeScript type definitions
│   └── package.json      # Frontend dependencies
│
└── server/               # Backend (Go)
    ├── main.go          # API routes and request handlers
    └── database/
        ├── db.go        # Data storage and CRUD operations
        └── example_data.go  # Sample polls for testing
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/poll` | Get all polls (can filter by tags) |
| GET | `/api/poll/:id` | Get a single poll by ID |
| POST | `/api/poll/new` | Create a new poll |
| DELETE | `/api/poll/delete/:id` | Delete a poll |
| PATCH | `/api/poll/update/:id/:option` | Vote on a poll option |

## How to Run

### Backend
```bash
cd server
go run main.go
```
Server runs on http://localhost:4000

### Frontend
```bash
cd client
npm install
npm run dev
```
App runs on http://localhost:3000

## Features

- Real-time voting with instant result updates
- Color-coded poll options for easy visual distinction
- Tag-based filtering to discover polls by category
- Responsive design that works on desktop and mobile
- Clean, modern UI with smooth animations

## Note

This is a demo project using in-memory storage. All data resets when the server restarts.
