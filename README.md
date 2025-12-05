# CyberLearn - Security Fundamentals Hub

An interactive, progression-based learning platform for cybersecurity fundamentals built with Next.js 14.

## Features

- **4 Learning Modules** covering foundational security concepts
- **Interactive Quizzes** at the end of each module (80% pass threshold)
- **Progress Tracking** with localStorage persistence
- **"Cyber-Glow" Theme** with deep blues, blacks, and neon accents
- **SkillForge** curated external resources page

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cyber-learning-hub

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and deploy

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── module-1/          # Module 1 content & quiz
│   ├── module-2/          # Module 2 content & quiz
│   ├── module-3/          # Module 3 content & quiz
│   ├── module-4/          # Module 4 content & quiz
│   ├── skillforge/        # External resources page
│   ├── layout.tsx         # Root layout with sidebar
│   ├── page.tsx           # Dashboard/home page
│   └── globals.css        # Global styles & theme
├── components/
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── Quiz.tsx           # Quiz component
│   └── ContentPage.tsx    # Content page template
├── context/
│   └── ProgressContext.tsx # Progress state management
└── data/
    └── curriculum.ts      # All module/quiz content
```

## Learning Modules

1. **Foundational Principles** - CIA Triad, Defense in Depth, Risk Management, User Security
2. **Network & Systems** - TCP/IP, Ports, Firewalls, VPNs, Linux Basics
3. **Common Attacks & Defenses** - Web Attacks (SQLi, XSS), Malware, Social Engineering
4. **Cryptography & Data Protection** - Encryption, Hashing, HTTPS/TLS, Disk Encryption

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State:** React Context + localStorage

## License

MIT

