FROM node:18.18-alpine

WORKDIR /usr/src

COPY . .

EXPOSE 5000

RUN corepack enable

RUN pnpm i

RUN pnpm dlx prisma generate

RUN pnpm build

CMD ["pnpm", "start"]