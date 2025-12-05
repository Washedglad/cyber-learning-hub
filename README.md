# CyberLearn - Security Fundamentals Hub

An interactive, progression-based learning platform for cybersecurity fundamentals built with Next.js 14.

## Live Demo

[View Live Site](https://cyber-learning-hub.vercel.app) *(update with your deployed URL)*

## Features

- **4 Learning Modules** covering foundational security concepts
- **Interactive Quizzes** at the end of each module (80% pass threshold)
- **Progress Tracking** with localStorage persistence
- **Responsive Design** with persistent navigation sidebar
- **Curated Resources** page linking to hands-on labs and learning platforms

## Modules

| Module | Topics Covered |
|--------|----------------|
| Foundational Principles | CIA Triad, Defense in Depth, Risk Management, User Security Best Practices |
| Network & Systems | TCP/IP, Common Ports, Firewalls, VPNs, Linux Command Line, File Permissions |
| Common Attacks & Defenses | SQL Injection, XSS, OWASP Top 10, Malware Types, Social Engineering |
| Cryptography & Data Protection | Symmetric/Asymmetric Encryption, Hashing, HTTPS/TLS, Disk Encryption |

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State:** React Context + localStorage

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── module-1/          # Module 1 content & quiz
│   ├── module-2/          # Module 2 content & quiz
│   ├── module-3/          # Module 3 content & quiz
│   ├── module-4/          # Module 4 content & quiz
│   └── skillforge/        # External resources page
├── components/            # Reusable UI components
├── context/               # React Context for state management
└── data/                  # Module content and quiz data
```

## License

MIT
