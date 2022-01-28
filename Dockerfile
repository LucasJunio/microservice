FROM node:14-alpine AS builder
WORKDIR /node/src/app
COPY . .
RUN npm install && npm run build

FROM node:14-buster-slim AS base 

WORKDIR /opt/oracle
ENV ORACLE_CLIENT_NAME="instantclient-basic-linux.x64-21.5.0.0.0dbru"
RUN apt-get update && apt-get install -y libaio1 wget unzip
RUN wget https://download.oracle.com/otn_software/linux/instantclient/215000/${ORACLE_CLIENT_NAME}.zip && \
  unzip ${ORACLE_CLIENT_NAME}.zip && rm -f ${ORACLE_CLIENT_NAME}.zip && \
  cd /opt/oracle/instantclient* && rm -f *jdbc* *occi* *mysql* *mql1* *ipc1* *jar uidrvci genezi adrci && \
  echo /opt/oracle/instantclient* > /etc/ld.so.conf.d/oracle-instantclient.conf && ldconfig

WORKDIR /usr/app
COPY --from=builder /node/src/app/dist ./dist
COPY --from=builder /node/src/app/package.json ./package.json
RUN npm install --production

RUN mkdir logs
RUN chmod 777 -R logs/

EXPOSE 8080

# Start the app
CMD ["npm", "run", "start-prod"]