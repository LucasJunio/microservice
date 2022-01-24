FROM node:10-alpine AS builder

RUN apk add --no-cache libaio gcompat libnsl

COPY instantclient_12_1.zip ./
RUN unzip instantclient_12_1.zip && \
  mv instantclient_12_1/ /usr/lib/ && \
  rm instantclient_12_1.zip && \
  ln /usr/lib/instantclient_12_1/libclntsh.so.12.1 /usr/lib/libclntsh.so && \
  ln /usr/lib/instantclient_12_1/libocci.so.12.1 /usr/lib/libocci.so && \
  ln /usr/lib/instantclient_12_1/libociei.so /usr/lib/libociei.so && \
  ln /usr/lib/instantclient_12_1/libnnz12.so /usr/lib/libnnz12.so && \
  ln /usr/lib/libnsl.so.2 /usr/lib/libnsl.so.1

ENV ORACLE_BASE /usr/lib/instantclient_12_1
ENV LD_LIBRARY_PATH /usr/lib/instantclient_12_1
ENV TNS_ADMIN /usr/lib/instantclient_12_1
ENV ORACLE_HOME /usr/lib/instantclient_12_1

WORKDIR /pp-api

COPY . .

RUN mkdir logs
RUN chmod 777 -R logs/

FROM node:10-alpine
WORKDIR /pp-api
COPY --from=builder /pp-api/package.json ./package.json
COPY --from=builder /pp-api/dist ./
COPY --from=builder /pp-api/node_modules ./
RUN npm install --production

EXPOSE 8080

# Start the app
CMD ["npm", "run", "start-prod"]
