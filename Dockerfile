FROM node:18.13-alpine

ENV WORKDIR /app
ADD ./.output $WORKDIR/

WORKDIR $WORKDIR

CMD ["node", "./server/index.mjs"]
