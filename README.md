#DRISHTI 
Ai Disaster Intelligence & response

A dashboard + AI assistant for coordinating flood response across three
stakeholder types (Local Authority, NGO, Emergency Team), split into a
proper client/server app:

- **`frontend/`** — React + Vite + Tailwind single-page app. Renders the
  situation dashboard and the role-based AI chat. Never talks to Anthropic
  directly — it only calls the backend.
- **`backend/`** — Node.js + Express API. Holds the mock operational data,
  builds the system prompts, and is the only thing that holds the Anthropic
  API key.

Splitting it this way keeps the API key off the browser and gives you a
single place (the backend) to swap the mock data for a real incident feed
later.

## Project structure

```
eodss/
├── backend/
│   ├── src/
│   │   ├── data/            # mock situation data + role prompt config
│   │   │   ├── situation.js
│   │   │   └── roles.js
│   │   ├── services/        # Anthropic client + prompt/context builders
│   │   │   ├── claudeService.js
│   │   │   └── contextBuilder.js
│   │   ├── middleware/
│   │   │   └── validate.js
│   │   ├── routes/          # one file per API resource
│   │   │   ├── situation.js
│   │   │   ├── summary.js
│   │   │   └── chat.js
│   │   └── server.js        # Express app entrypoint
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js    # fetch wrapper for the backend API
│   │   ├── components/      # one file per UI piece
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Assistant.jsx
│   │   │   ├── ChatBubble.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── TabButton.jsx
│   │   ├── data/             # UI-only constants (icons, colors, copy)
│   │   │   ├── roles.js
│   │   │   └── styles.js
│   │   ├── hooks/
│   │   │   └── useSituationData.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── .env.example
│   └── package.json
├── package.json              # convenience scripts to run both at once
└── README.md
```

## Prerequisites

- Node.js 18+
- An Anthropic API key (https://console.anthropic.com/)

## Setup

1. **Install dependencies** (from the repo root):

   ```bash
   npm run install:all
   ```

   Or manually: `cd backend && npm install`, then `cd ../frontend && npm install`.

2. **Configure the backend:**

   ```bash
   cd backend
   cp .env.example .env
   # edit .env and paste your ANTHROPIC_API_KEY
   ```

3. **Configure the frontend** (only needed if your backend runs somewhere
   other than `http://localhost:4000`):

   ```bash
   cd frontend
   cp .env.example .env
   ```

## Running

From the repo root, with both `npm install`s done:

```bash
npm run dev
```

This starts the backend on `http://localhost:4000` and the frontend on
`http://localhost:5173` together. Open the frontend URL in your browser.

To run them separately instead:

```bash
# terminal 1
cd backend && npm run dev

# terminal 2
cd frontend && npm run dev
```

## API surface (backend)

| Method | Path             | Description                                              |
|--------|------------------|------------------------------------------------------------|
| GET    | `/api/health`    | Health check, reports whether an API key is configured.   |
| GET    | `/api/situation` | Returns disaster info, locations, stats, resources, and the initial/incoming report lists. |
| POST   | `/api/summary`   | Body `{ reports }` — returns a fresh AI situation brief.   |
| POST   | `/api/chat`      | Body `{ role, messages, reports }` — returns the assistant's reply for that stakeholder role. |

## Notes

- All data in `backend/src/data/` is mocked for the prototype. Swap it for
  real database/API calls without touching the routes or the frontend.
- The frontend still simulates live report ingestion client-side (drawing
  from the `incomingQueue` returned by `/api/situation`) so the demo feel
  is unchanged; a production build would instead stream new reports from
  the backend (e.g. via WebSockets or polling).
- `ANTHROPIC_MODEL` in `backend/.env` defaults to `claude-sonnet-4-6` — set
  it to whichever model you have access to.
