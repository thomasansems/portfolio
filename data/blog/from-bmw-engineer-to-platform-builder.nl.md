---
title: 'Van BMW Engineer naar Platform Builder'
date: '2026-02-22'
tags: ['career', 'ai', 'heysummon', 'entrepreneurship']
draft: false
summary: 'Na 14 jaar full-stack engineering — waaronder enterprise UIs bij BMW — bouw ik nu HeySummon, een open-source platform dat mensen in de AI loop houdt.'
---

## De Reis

Sinds 2012 bouw ik webapplicaties. Van kleine startups tot enterprise-grade systemen bij BMW Group — ik heb het volledige spectrum gezien van wat nodig is om software te shippen die werkt op schaal.

Maar er is iets verschoven de afgelopen twee jaar. AI agents worden ongelooflijk capabel — maar ze lopen nog steeds vast. Ze hallucineren. Ze missen context. Ze hebben een mens nodig die op precies het juiste moment inspringt.

Die kloof is waar ik voor bouw.

## Wat Ik Bouw

**HeySummon** is een Human in the Loop as a Service platform. Het idee is simpel: wanneer een AI agent vastloopt, moet het een menselijke expert kunnen oproepen — real-time, veilig en betrouwbaar.

Zie het als een brug tussen AI automatisering en menselijke expertise. Een AI agent stuurt een vraag via de API. Een menselijke provider ontvangt het direct via SSE streams. Ze antwoorden. De agent gaat verder.

### De Technische Uitdaging

Dit goed bouwen betekent lastige problemen oplossen:

- **Real-time communicatie** via Server-Sent Events — geen polling, geen WebSockets, maar persistente SSE streams die overal werken
- **Drie-factor API authenticatie** — API key + device token + hardware fingerprint, want een gestolen `.env` bestand mag het systeem niet compromitteren
- **Content safety** — een stateless guard sidecar die elk bericht valideert, sanitized en ondertekent voordat het een mens bereikt
- **Zero-knowledge architectuur** — het platform versleutelt alles at rest, met cryptografisch bewijs dat content door validatie is gegaan

### De Stack

- **Next.js 16** met App Router
- **TypeScript** end-to-end
- **Prisma + SQLite** (draait overal, geen externe DB nodig)
- **SSE proxy** die Mercure abstraheert (de event bus wordt nooit blootgesteld)
- **Docker** met geharde containers (read-only FS, dropped capabilities, seccomp profielen)

## Waarom Open Source

Ik geloof dat infrastructuur zoals dit inspecteerbaar moet zijn. Wanneer je menselijke beslissingen door een platform routeert, is vertrouwen essentieel. Open source betekent dat iedereen het beveiligingsmodel kan verifiëren, een eigen instantie kan draaien en verbeteringen kan bijdragen.

HeySummon is momenteel in ontwikkeling. Het platform werkt end-to-end — requests stromen, responses komen aan, authenticatie houdt stand. Ik ben de security hardening en documentatie aan het afronden voor de publieke launch.

## Wat Volgt

Ik documenteer de reis hier. Toekomstige posts gaan over de technische architectuur, het content safety model en lessen van het bouwen van een platform naast een fulltime baan.

Als je geïnteresseerd bent in de kruising van AI en menselijke expertise, volg mee.

→ [heysummon.ai](https://www.heysummon.ai)
