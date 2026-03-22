# Route Atlas

Route Atlas is a topic-specific chatbot product for global travel planning.
It is intentionally designed as a focused planning assistant, not a generic chat wrapper.

The product helps users with:

- destination-level planning
- one-day or multi-day itinerary structure
- where to stay
- local food direction
- mobility strategy
- budget-aware decisions

## Assignment Context

This project was built for the Thinkly Labs software engineering assignment.
The assignment asks for:

- a chatbot trained on a chosen topic
- frontend thinking shown through UX choices
- a functional responsive product
- deployment readiness
- submission artifacts: live link, public repo, and Loom walkthrough

Route Atlas addresses these goals through a travel-planning-specific chatbot experience and a purpose-built UI.

## Product Definition

### Topic

Global city travel planning.

### Why this topic

Travel planning has repeated high-value user intents that benefit from structured assistance:

- itinerary generation
- area selection for stays
- transit strategy
- budget framing
- local etiquette and timing

This makes the chatbot feel domain-specific and practical.

### Primary user flow

1. User enters a city or destination context.
2. User asks planning questions (itinerary, stay, transport, food, budget).
3. Chatbot returns location-aware guidance.
4. User gives follow-up constraints (days, budget, interests).
5. Chatbot adapts plan using conversation context.

## Frontend Thinking Implemented

The assignment explicitly emphasizes frontend decision quality. This project includes:

### First impression

- clear product identity and scope
- immediate prompt suggestions
- focused visual hierarchy (insights + conversation layout)

### Conversation quality states

- empty state guidance through starter prompts
- loading state with animated response placeholder
- retryable error state
- conversation reset capability

### Practical interaction details

- auto-resizing prompt input based on content length
- aligned send action and composer layout
- responsive behavior for desktop and mobile
- day/night theme support

## Core Features

- location-aware travel chatbot behavior
- support for curated locations plus useful fallback for uncatalogued destinations
- context-aware follow-up handling (days, budget, interests)
- polished modern UI with subtle gradients and purposeful sectioning
- Zustand state management with persistence

## Technical Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn-style component architecture
- Zustand
- Lucide icons

## Architecture Summary

### UI layer

- app layout and visual framing
- chat shell and message rendering
- prompt composer and starter prompts
- theme toggle and shared UI primitives

### Domain layer

- travel knowledge profiles and starter intents
- chat response engine for location and intent mapping

### State layer

- chat state and async reply flow
- persisted theme mode

## Project Structure

- src/App.tsx: page layout and product framing
- src/components/chat: chat-specific UI modules
- src/components/ui: reusable UI primitives
- src/lib/knowledge.ts: travel topic data
- src/lib/chat-engine.ts: response generation logic
- src/store/chat-store.ts: Zustand state and persistence

## Run Locally

Prerequisites:

- Node.js 18+
- npm

Commands:

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Deployment

Recommended target: Vercel.

1. Push repository to GitHub.
2. Import project in Vercel.
3. Use Vite defaults.
4. Build command: npm run build
5. Output directory: dist
6. Deploy.

## PDF Requirement Mapping

### 1. Topic-specific chatbot

Implemented as a dedicated global travel planning assistant with explicit domain scope.

### 2. UI reflects topic and usability

Implemented via planning-first layout, prompt chips, context-rich conversation design, and travel-focused wording.

### 3. Frontend thinking quality

Implemented through first-impression clarity, empty/loading/error states, and practical interaction details.

### 4. Functional and responsive

Implemented with responsive layout, working chat flow, and verified production build.
