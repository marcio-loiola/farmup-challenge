# Dockerfile simples para processo seletivo
FROM node:18-alpine AS base

WORKDIR /app
COPY package.json package-lock.json* ./
COPY apps/api/package.json ./apps/api/
COPY apps/client/package.json ./apps/client/
RUN npm ci
COPY apps ./apps

# ===== API PRODUCTION =====
FROM node:18-alpine AS api
WORKDIR /app
COPY package.json package-lock.json* ./
COPY apps/api/package.json ./apps/api/
RUN npm ci --only=production --workspace=apps/api
COPY apps/api ./apps/api

EXPOSE 8080
ENV NODE_ENV=production PORT=8080
CMD ["node", "apps/api/server.js"]

# ===== CLIENT PRODUCTION =====
FROM base AS client
RUN npm run build --workspace=apps/client
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "apps/client/dist", "-l", "3000"]

# ===== DEVELOPMENT =====
FROM base AS dev
RUN npm install -g concurrently nodemon
EXPOSE 8080 5173
ENV NODE_ENV=development
CMD ["sh", "-c", "cd apps/api && npm run dev & cd apps/client && npm run dev & wait"]
