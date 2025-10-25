# --- build stage (DEBIAN / GLIBC, anti segfault)
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# pnpm via corepack
RUN corepack enable && corepack prepare pnpm@10.18.1 --activate

# deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# source
COPY . .

# (optional) debug
RUN node -v && pnpm -v && pnpm ls vite || true

# build
RUN pnpm build

# --- runtime (nginx) untuk serve Vite static
FROM nginx:1.27-alpine AS runner
WORKDIR /usr/share/nginx/html

RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist ./

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
