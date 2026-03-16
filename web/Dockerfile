FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy application source
COPY . .

# Build (runs Prisma generate and Next.js build)
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy necessary build artifacts and dependencies from builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Persist SQLite database outside the image
VOLUME ["/data"]

EXPOSE 3000

# If DATABASE_URL is not provided, default to a file in the /data volume
CMD ["sh", "-c", "DATABASE_URL=${DATABASE_URL:-file:/data/dev.db} npm run start"]

