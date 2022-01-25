FROM node:14-alpine AS builder
WORKDIR /node/src/app
COPY . .
RUN npm install sau-core-lib-api@latest --save
RUN npm install && npm run build

FROM node:14-buster-slim
COPY docker-libs /docker-libs
RUN dpkg -i /docker-libs/*.deb
WORKDIR /opt/oracle
ENV ORACLE_CLIENT_NAME="instantclient-basic-linuxx64"
RUN wget https://download.oracle.com/otn_software/linux/instantclient/${ORACLE_CLIENT_NAME}.zip && \
  unzip ${ORACLE_CLIENT_NAME}.zip && rm -f ${ORACLE_CLIENT_NAME}.zip && \
  cd /opt/oracle/instantclient* && rm -f *jdbc* *occi* *mysql* *mql1* *ipc1* *jar uidrvci genezi adrci && \
  echo /opt/oracle/instantclient* > /etc/ld.so.conf.d/oracle-instantclient.conf && ldconfig
WORKDIR /usr/app
COPY --from=builder /node/src/app/dist ./
COPY --from=builder /node/src/app/package.json ./package.json
RUN npm install --production
ENV FILE_TEMP_FOLDER = "temp"
RUN mkdir /usr/app/temp
RUN chmod 1777 /usr/app/temp
EXPOSE 3000
CMD [ "node", "src/main.js" ]