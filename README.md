# AI PM Challenge

AI PM Challenge is a platform that helps product managers become **AI-native PMs** through a 60-day journey of daily AI learning, interview preparation, and building real AI prototypes.

The product is designed to move PMs beyond buzzwords and into **practical understanding of AI systems**, how they behave in real products, and how to design, scope, and ship AI-powered features. Each day combines concepts, practice, and hands-on building so that users develop both **AI literacy** and **product thinking around AI**.

---

## The Idea

Modern product managers are increasingly expected to understand how AI models work, what they can and cannot do, and how to integrate them responsibly into products.

Most resources either stay too theoretical (papers, frameworks) or too code-heavy (ML engineering tutorials). AI PM Challenge sits in the middle: it gives PMs **structured daily challenges** that combine:

- clear explanations of core AI concepts  
- realistic AI product interview questions  
- small but meaningful AI prototype projects

The goal is not to turn PMs into ML engineers, but to help them build **practical AI product skills**: scoping AI features, reasoning about tradeoffs, and communicating effectively with engineering, design, and stakeholders.

---

## How It Works

AI PM Challenge is structured as a daily challenge system with three intertwined tracks.

### Daily AI Concept

Every day the user learns one AI concept explained from a **product manager’s perspective**:

- what the concept is (e.g. embeddings, RAG, system prompts)  
- why it matters for product decisions  
- how it shows up in real AI features

This builds a mental model of how AI systems work end-to-end.

### Interview Question (every 2 days)

Every second day, the platform surfaces an **AI Product Manager interview question**. These questions are designed to mirror real interview prompts:

- product sense for AI features  
- metrics and evaluation in AI contexts  
- tradeoffs around latency, cost, safety, and UX  

Users can practice structuring answers and build confidence for AI-heavy PM interviews.

### Prototype Challenge (every 3 days)

Every third day, users get a **prototype challenge**: a small AI product to design and start building.

- Each prototype is scoped to be realistic but manageable.  
- Users track their prototypes, link GitHub repos, and generate structured prompts.  
- Over time, these become **portfolio-ready AI projects**.

The cadence looks like:

- every day: concept  
- every 2 days: interview question  
- every 3 days: prototype challenge  

This rhythm keeps users learning, thinking, and building in parallel.

---

## Examples of Prototypes

Throughout the challenge, users are guided to build concrete AI-powered product ideas such as:

- **AI meeting summarizer** – summarize calls, highlight decisions, and suggest follow-ups.  
- **Support ticket classifier** – route tickets by intent, urgency, or product area.  
- **RAG documentation chatbot** – answer questions grounded in product docs and FAQs.  
- **AI PRD generator** – draft product requirement documents from goals and constraints.  
- **AI research assistant** – synthesize research notes, user interviews, and market analysis.  
- **AI feedback analyzer** – cluster and summarize user feedback from multiple channels.

These prototypes are intentionally practical: they mirror the kinds of AI features PMs are being asked to scope and ship today. The goal is to build **strong AI product intuition**—knowing how concepts like embeddings, context windows, and evaluation map to real product decisions.

---

## Key Features

- **Google OAuth authentication**  
  Simple, secure sign-in using Google accounts.

- **Personalized challenge progress tracking**  
  Each user has their own 60-day challenge, progress states, and streaks.

- **Daily AI learning dashboard**  
  A focused dashboard that shows today’s concept, interview question, and tasks.

- **AI concept library**  
  A curated collection of 60 AI and AI-product concepts explained for PMs.

- **Prototype tracking**  
  View all prototype challenges, attach GitHub repos, and generate prompts for tools like Cursor.

- **Interview preparation questions**  
  A rotating set of AI PM interview questions to practice throughout the challenge.

- **Email reminders for incomplete challenges**  
  Gentle nudges when users fall behind on their daily tasks.

- **Automated daily challenge monitoring**  
  Background jobs check who is behind and trigger reminders, keeping the challenge on track.

---

## Technology

AI PM Challenge is built as a modern web product using a pragmatic, production-ready stack.

### Frontend

- **Next.js** – App Router-based React framework for server-rendered pages and routing.  
- **React** – Component-driven UI for the dashboard and interactive flows.  
- **TailwindCSS** – Utility-first styling for a clean, modern interface.

### Backend

- **Prisma ORM** – Type-safe data access layer for users, progress, challenges, and prototypes.  
- **SQLite / PostgreSQL compatible** – Uses SQLite in this build, but the schema is portable to PostgreSQL and other relational databases.

### Infrastructure

- **NextAuth** – Handles authentication, sessions, and integration with Google OAuth.  
- **Resend** – Email delivery for reminder notifications.  
- **node-cron** – Scheduled jobs that check daily progress and send reminder emails.

The stack is intentionally close to what many product teams already use, making it a realistic reference architecture for AI-native product dashboards.

---

## Project Goal

The expected outcomes of completing AI PM Challenge are:

- **Learned 60 key AI concepts**  
  From embeddings and RAG to evaluation, guardrails, and AI UX patterns.

- **Practiced 30 AI product interview questions**  
  Covering product sense, metrics, AI safety, and system design from a PM lens.

- **Built around 20 AI product prototypes**  
  Concrete projects that can be linked on GitHub or a portfolio.

- **Developed strong AI product intuition**  
  The ability to reason about what to build with AI, how to scope it, and how to evaluate success.

By the end, users should feel comfortable leading conversations about AI features, collaborating with technical teams, and demonstrating hands-on AI product experience.

---

## Future Improvements

The current version focuses on a solid solo challenge experience. Potential future directions include:

- **AI feedback for interview answers**  
  Automatic structured feedback and suggested improvements on written responses.

- **Automatic GitHub repo generation for prototypes**  
  One-click scaffolding of boilerplate repos tailored to each prototype challenge.

- **AI evaluation of prototype quality**  
  Heuristics and model-based scoring for UX, clarity, and alignment with the challenge brief.

- **Team challenges for product teams**  
  Shared timelines, group dashboards, and collaborative prototype sprints.

- **Public challenge leaderboards**  
  Opt-in profiles showing streaks, completed prototypes, and badges to showcase progress.

These improvements aim to make AI PM Challenge not just a solo learning path, but a **community and practice space** for AI-native product builders.

