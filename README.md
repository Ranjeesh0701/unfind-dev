# Unfind

> **A modern, full-stack freelance marketplace and developer collaboration platform powered by Next.js, Prisma, Socket.io, and Three.js.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4-010101?style=flat&logo=socketdotio&logoColor=white)](https://socket.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 💡 What is Unfind?

**Unfind** is an open, modern freelance marketplace and developer collaboration platform built for the modern web. It bridges the gap between clients seeking technical talent and engineers looking for high-impact opportunities. 

Traditional freelancing platforms are often bogged down by cluttered interfaces, slow communication channels, and disjointed workflows. Unfind re-imagines the hiring and collaboration experience by pairing a sleek, developer-centric interface with real-time messaging, flexible project management, and transparent proposal tracking.

---

## 🎯 How It Helps

Unfind simplifies the technical hiring and project execution lifecycle for both sides of the marketplace:

### 🏢 For Clients & Project Owners
- **Post Technical Projects Effortlessly**: Define project scopes with flexible pricing models (Fixed or Hourly), specify required experience levels (Beginner, Intermediate, Expert), attach project specifications or wireframes, and set delivery deadlines.
- **Review Structured Proposals**: Evaluate candidate bids, assess pitch descriptions, and accept or reject proposals with clear status tracking.
- **Instant Real-Time Chat**: Move directly from proposal review into live conversations powered by Socket.io to clarify requirements and coordinate deliverables without third-party tools.
- **Inspect Developer Backgrounds**: View candidate profiles highlighting past work experience, verified educational background, and client testimonials.

### 💻 For Freelancers & Developers
- **Discover Relevant Work**: Search and filter project feeds tailored to your skill set, preferred engagement model, and compensation expectations.
- **Submit Targeted Proposals**: Submit customized bids with direct pitches to project owners, keeping your active negotiations organized.
- **Real-Time Client Engagement**: Get notified and converse directly with clients through real-time chat tied to your proposals.
- **Comprehensive Developer Identity**: Build a clean professional profile featuring a bio summary, work timeline, educational credentials, and collected recommendations.
- **Save Opportunities**: Bookmark interesting projects to research and apply when you are ready.

---

## ✨ Features

- **💼 Project Marketplace & Job Feed**:
  - Publish projects with budget schemes, experience tiers, categories, and file attachments.
  - Explore active listings, filter by categories and keywords, and bookmark projects to your saved list.

- **📝 Proposal & Bidding Lifecycle**:
  - Submit detailed proposals with price bids and introductory pitches.
  - Manage proposal states seamlessly (`OPEN`, `ACCEPTED`, `REJECTED`).

- **💬 Real-Time Messaging (Socket.io)**:
  - WebSocket-powered live 1-on-1 messaging directly associated with project proposals.
  - Zero-delay message updates and notification indicators.

- **👤 Developer Profiles & Onboarding**:
  - Interactive onboarding workflow for new freelancers and clients.
  - Structured profile pages detailing work experience, college/university background, and testimonials.

- **🔐 Secure Authentication**:
  - Built with NextAuth.js v5 (Auth.js) and `@auth/prisma-adapter`.
  - Social login via GitHub and Google OAuth, alongside email/password credentials with bcrypt encryption.

- **🎨 Modern UI & 3D Visual Experience**:
  - Dark-mode first UI crafted with Radix UI primitives and Tailwind CSS.
  - Interactive 3D globe visualization powered by Three.js, `@react-three/fiber`, and `@react-three/drei`.
  - Fluid micro-interactions via Framer Motion and non-intrusive toast notifications with Sonner.

- **📁 Cloud File Attachments**:
  - Secure asset and project document uploads integrated through UploadThing.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router + Pages Router for WebSocket APIs) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/) |
| **3D Graphics** | [Three.js](https://threejs.org/), [React Three Fiber](https://r3f.docs.pmnd.rs/), [React Three Drei](https://github.com/pmndrs/drei) |
| **Database & ORM** | [PostgreSQL](https://www.postgresql.org/), [Prisma ORM](https://www.prisma.io/) |
| **Authentication** | [NextAuth.js v5 (Auth.js)](https://authjs.dev/), `@auth/prisma-adapter` |
| **Real-Time Engine** | [Socket.io](https://socket.io/) & [Socket.io-client](https://socket.io/docs/v4/client-api/) |
| **State & Data Fetching** | [TanStack React Query v5](https://tanstack.com/query/latest), [Axios](https://axios-http.com/) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **File Storage** | [UploadThing](https://uploadthing.com/) |

---

## 📁 Project Structure

```text
unfind-dev/
├── app/
│   ├── (auth)/             # Authentication pages (sign-in, sign-up)
│   ├── (profile)/          # User onboarding and profile views
│   ├── (unfind)/           # Main application routes
│   │   ├── (routes)/       # Feed, projects, project creation, messages
│   │   └── (site)/         # Landing page and home view
│   ├── api/                # Next.js App Router API routes (auth, uploadthing, projects)
│   ├── globals.css         # Global styling and Tailwind directives
│   └── layout.tsx          # Root application layout
├── components/
│   ├── chat/               # Real-time chat UI, headers, inputs, and message lists
│   ├── global/             # Navigation lane, sidebar, top navbar, user dropdown
│   ├── providers/          # Auth, Socket, Query, and Notification context providers
│   └── ui/                 # Radix UI and custom visual components
├── data/                   # Data access queries (e.g. user lookup helpers)
├── hooks/                  # Custom React hooks (sockets, debounce, chat queries)
├── libs/                   # Database client (Prisma), NextAuth configuration, utilities
├── pages/api/socket/       # Pages Router endpoints for Socket.io WebSocket server
├── prisma/
│   └── schema.prisma       # Database schema and relational models
├── public/                 # Static assets, icons, and illustrations
└── types/                  # Global and custom TypeScript definitions
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.17.0 or later recommended)
- [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/), or [bun](https://bun.sh/)
- A running [PostgreSQL](https://www.postgresql.org/) database instance

### 1. Clone the Repository

```bash
git clone https://github.com/Ranjeesh0701/unfind-dev.git
cd unfind-dev
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root by copying the template:

```bash
cp .env.example .env
```

Populate the required environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/unfind?schema=public"

# NextAuth / Auth.js
AUTH_SECRET="your-generated-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (Optional for social login)
GITHUB_ID="your-github-oauth-client-id"
GITHUB_SECRET="your-github-oauth-client-secret"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# UploadThing (File uploads)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Public App URL (Used by Socket.io client)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

> **Tip:** You can generate a secure `AUTH_SECRET` using `openssl rand -base64 32`.

### 4. Setup the Database

Generate the Prisma client and synchronize the schema with your PostgreSQL database:

```bash
npx prisma generate
npx prisma db push
```

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Starts the Next.js dev server with Turbopack |
| `build` | `npm run build` | Compiles the production build |
| `start` | `npm run start` | Runs the compiled production server |
| `lint` | `npm run lint` | Runs ESLint checks across the codebase |

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
