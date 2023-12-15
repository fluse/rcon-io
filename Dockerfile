FROM node:18-alpine

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run dev

# FROM node:18-alpine AS base

# FROM base AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# COPY package.json package-lock.json* ./
# RUN npm ci


# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

# RUN npm run build

# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV production
# ENV NEXT_TELEMETRY_DISABLED 1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public

# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# ENV NEXT_TELEMETRY_DISABLED 1
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# RUN mkdir db

# USER nextjs

# EXPOSE 3000

# ENV PORT 3000
# ENV HOSTNAME "0.0.0.0"

# CMD ["node", "server.js"]