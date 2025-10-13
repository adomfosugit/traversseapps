# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ✅ Install Pnpm Manually Instead of Using Corepack
RUN npm install -g pnpm@latest

# Copy dependency files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# ✅ Install dependencies using the manually installed Pnpm
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app


# Ensure Pnpm is installed in the builder stage as well
RUN npm install -g pnpm@latest

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ✅ Build the Next.js application
RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_PUBLIC_BASE_URL=http://139.84.242.115:8080/
ENV NEXT_PUBLIC_PROJECT_ID=6771516200333a41d2ef
ENV NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
ENV NEXT_PUBLIC_APPWRITE_PROJECT=6771516200333a41d2ef
ENV NEXT_DATABASE_ID=6772fbb300261f95053e
ENV NEXT_BUCKET_ID=67a22ffc0012632fa152
ENV NEXT_SERVICEPROVIDER_COLLECTION_ID=67730006000987c372f9
ENV NEXT_PUBLIC_RECOVERY_URL=https://traverseapps.vercel.app/updateaccount
ENV NEXT_LAND_COLLECTION_ID=678bef3600002e1ee2be
ENV NEXT_PUBLIC_JOBLISTING=684414df00195c710925
ENV NEXT_BUCKET_ID_DOCS=67a23029003cea891796
ENV NEXT_LAND_PROJECT=67841d29002e6e294b8d
ENV NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_1156b935d863b0c6d92a19b3678d034562cf062a

# ✅ Start the Next.js application
CMD ["node", "server.js"]