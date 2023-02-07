FROM node:18.13-alpine
WORKDIR /app
COPY ./ /app
CMD ["node", "/app/server/index.mjs"]
