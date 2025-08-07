# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
NTUC Digital Concierge - A service recommendation platform that helps users find relevant NTUC services through guided questions or AI-powered chat. The system analyzes user profiles against 25+ services across Protection, Placement, Privileges, CDC Project, and Passion pillars.

## Commands

### Development
```bash
npm run dev        # Start development server on http://localhost:3000
npm run build      # Build production bundle
npm run start      # Start production server
npm run lint       # Run ESLint checks
npm run typecheck  # Run TypeScript type checking
```

### Testing & Quality
Before committing code, always run:
```bash
npm run lint && npm run typecheck
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **UI**: React 18.2, TypeScript, Tailwind CSS
- **Components**: Radix UI primitives for accessibility
- **Styling**: Custom NTUC brand colors (red: #ED1C24, blue: #003D7A)

### Project Structure
```
/app                  # Next.js App Router pages
  /chat              # Chat interface page
  /form              # Form wizard page
  layout.tsx         # Root layout with metadata
  page.tsx           # Landing page with service selection

/components          # React components
  FormWizard.tsx     # Multi-step questionnaire with progress tracking
  ChatInterface.tsx  # AI chat interface with quick actions
  ServiceCard.tsx    # Service recommendation display card

/lib                 # Core business logic
  questions.ts       # Question flow definitions (7 steps)
  recommendation-engine.ts  # Service matching algorithm
  services-data.json # Service catalog (25+ services)
```

### Key Implementation Details

#### Service Recommendation Algorithm
The recommendation engine (`lib/recommendation-engine.ts`) uses a weighted scoring system:
- Persona matching (10 points)
- Employment type matching (8 points)
- Need matching (8 points)
- Urgency matching (5 points)
- Membership benefits (3 points)
- Channel preference (2 points)

Services are ranked by total score and top 3 are presented with confidence levels (high/medium/low).

#### User Journey Paths
1. **Form Path** (`/form`): 7-question guided flow with progress bar
2. **Chat Path** (`/chat`): Natural language interface with quick action buttons

Both paths converge to the same recommendation engine but with different UX approaches.

#### NTUC Service Categories (4P+1 Model)
- **Protection**: Worker rights, training, insurance
- **Placement**: Jobs, career transitions
- **Privileges**: Discounts, member benefits
- **CDC Project**: Community, volunteering
- **Passion**: Hobbies, wellness, learning

### State Management
- Form wizard uses local React state with step tracking
- Chat interface maintains message history in component state
- No external state management library (intentionally simple for MVP)

### Responsive Design
- Mobile-first approach with breakpoints at `md:` (768px)
- Touch-friendly card interfaces for service selection
- Collapsible navigation on mobile devices

### Accessibility Features
- Radix UI components for ARIA compliance
- Keyboard navigation support throughout
- High contrast NTUC brand colors meeting WCAG standards
- Emergency hotline banner always visible

### Integration Points
Currently standalone MVP. Future integrations planned:
- Python backend API for advanced ML recommendations
- NTUC member database for personalized results
- WhatsApp Business API for chat continuity
- Analytics tracking for service usage patterns

### Performance Considerations
- Static service data loaded from JSON (no API calls in MVP)
- Simulated 1.5s delay for recommendation calculation UX
- Client-side rendering for interactive components
- No authentication required (public access)

## NTUC-Specific Context
This project is part of NTUC's digital transformation initiative. Key stakeholders include workers, freelancers, job seekers, and employers. The platform must be simple enough for non-tech-savvy users while providing value through intelligent service matching.

Emergency hotline (6213-8008) must be prominently displayed for urgent cases. All recommendations should consider TS-SEP compliance for freelancer-related services.