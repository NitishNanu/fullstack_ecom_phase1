# TechHub Store - Phase 1

A modern full-stack e-commerce platform specializing in tech products:
- server/: Node.js + Express + Mongoose (API, seed script)
- client/: Vite + React + Tailwind frontend (20 products per page, filters, pagination)

## Quick start (local)

1. Start MongoDB locally (or use Atlas). Update server/.env if needed.
2. Server:
   cd server
   npm install
   cp .env.example .env
   npm run seed
   npm run dev
3. Client:
   cd client
   npm install
   npm run dev
