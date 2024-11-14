FROM node:22-alpine AS base

FROM base AS deps

RUN corepack enable
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=~/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=~/.local/share/pnpm/store pnpm install --frozen-lockfile --prod
COPY . .

# FROM base AS build

# RUN corepack enable
# WORKDIR /app
# COPY package.json pnpm-lock.yaml ./
# RUN --mount=type=cache,id=pnpm,target=~/.local/share/pnpm/store pnpm fetch --frozen-lockfile
# RUN --mount=type=cache,id=pnpm,target=~/.local/share/pnpm/store pnpm install --frozen-lockfile
# COPY . .
# RUN pnpm build

# FROM base

# WORKDIR /app
# COPY --from=deps /api/node_modules /app/node_modules
# COPY --from=deps /api/src /app/src
ENV NODE_ENV development
CMD ["pnpm", "run", "dev"]
