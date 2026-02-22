---
title: 'From BMW Engineer to Platform Builder'
date: '2026-02-22'
tags: ['career', 'ai', 'heysummon', 'entrepreneurship']
draft: false
summary: 'After 14 years of full-stack engineering — including building enterprise UIs at BMW — I am now building HeySummon, an open-source platform that keeps humans in the AI loop.'
---

## The Journey

Since 2012, I've been building web applications. From small startups to enterprise-grade systems at BMW Group, I've seen the full spectrum of what it takes to ship software that works at scale.

But something shifted in the past two years. AI agents are getting incredibly capable — yet they still hit walls. They hallucinate. They lack context. They need a human to step in at exactly the right moment.

That gap is what I'm building for.

## What I'm Building

**HeySummon** is a Human in the Loop as a Service platform. The idea is simple: when an AI agent gets stuck, it should be able to summon a human expert — in real-time, securely, and reliably.

Think of it as a bridge between AI automation and human expertise. An AI agent sends a question via the API. A human provider receives it instantly via SSE streams. They answer. The agent continues.

### The Technical Challenge

Building this right means solving hard problems:

- **Real-time communication** via Server-Sent Events — not polling, not WebSockets, but persistent SSE streams that work everywhere
- **Three-factor API authentication** — API key + device token + hardware fingerprint, because a stolen `.env` file shouldn't compromise the system
- **Content safety** — a stateless guard sidecar that validates, sanitizes, and signs every message before it reaches a human
- **Zero-knowledge architecture** — the platform encrypts everything at rest, with cryptographic proof that content passed through validation

### The Stack

- **Next.js 16** with App Router
- **TypeScript** end-to-end
- **Prisma + SQLite** (runs anywhere, no external DB needed)
- **SSE proxy** abstracting the event bus (never exposed externally)
- **Docker** with hardened containers (read-only FS, dropped capabilities, seccomp profiles)

## Why Open Source

I believe infrastructure like this should be inspectable. When you're routing human decisions through a platform, trust matters. Open source means anyone can verify the security model, run their own instance, and contribute improvements.

HeySummon is currently in development. The platform works end-to-end — requests flow, responses arrive, authentication holds. I'm finishing the security hardening and documentation before the public launch.

## What's Next

I'm documenting the journey here. Future posts will cover the technical architecture, the content safety model, and lessons from building a platform while working full-time.

If you're interested in the intersection of AI and human expertise, follow along.

→ [heysummon.ai](https://www.heysummon.ai)
