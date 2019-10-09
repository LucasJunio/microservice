FROM node:10-alpine

#VPN
RUN echo "http://dl-4.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
  && apk add --update --no-cache --virtual=build-dependencies \
    automake \
    autoconf \
    gcc \
    g++ \
    gettext \
    git \
    linux-headers \
    libtool \
    libxml2-dev \
    make \
    openssl-dev \
    pkgconfig \
    vpnc \
  && git clone https://github.com/dlenski/openconnect.git /tmp/openconnect \
  && cd /tmp/openconnect \
  && git checkout bfaba1b2ba2777f2495251e3870e5e88b5275fcc \
  && ./autogen.sh \
  && ./configure --with-vpnc-script=/etc/vpnc/vpnc-script --without-openssl-version-check \
  && make install \
  && apk del --purge build-dependencies \
  && rm -rf /tmp/* \
  && apk add --no-cache \
    openssl \
    libxml2 \
    vpnc \
  && sed -i '/$IPROUTE route flush cache/d' /etc/vpnc/vpnc-script \
  && mkdir /var/run/vpnc

#Driver Oracle
RUN   apk update \                                                                                                                                                                                                                        
  &&   apk add ca-certificates wget \                                                                                                                                                                                                      
  &&   update-ca-certificates  

RUN wget https://github.com/asg1612/alpine-oracle-instantclient/raw/master/instantclient_12_1.zip

RUN echo “http://dl-cdn.alpinelinux.org/alpine/edge/community 3” >> /etc/apk/repositories && \
  apk add --update libaio libnsl && \
  apk add libc6-compat && \
  apk add gcompat

RUN unzip instantclient_12_1.zip && \
    mv instantclient_12_1/ /usr/lib/ && \
    rm instantclient_12_1.zip && \
    ln /usr/lib/instantclient_12_1/libclntsh.so.12.1 /usr/lib/libclntsh.so && \
    ln /usr/lib/instantclient_12_1/libocci.so.12.1 /usr/lib/libocci.so && \
    ln /usr/lib/instantclient_12_1/libociei.so /usr/lib/libociei.so && \
    ln /usr/lib/instantclient_12_1/libnnz12.so /usr/lib/libnnz12.so

RUN echo “http://dl-cdn.alpinelinux.org/alpine/edge/community 3” >> /etc/apk/repositories && \
  apk add --update libaio libnsl && \
  ln -s /usr/lib/libnsl.so.2 /usr/lib/libnsl.so.1

ENV ORACLE_BASE /usr/lib/instantclient_12_1
ENV LD_LIBRARY_PATH /usr/lib/instantclient_12_1
ENV TNS_ADMIN /usr/lib/instantclient_12_1
ENV ORACLE_HOME /usr/lib/instantclient_12_1

#Aplicação
WORKDIR /src/app

COPY ./package* ./
RUN npm install && \
    npm cache clean --force

COPY  . .

EXPOSE 8080

CMD ["/bin/sh", "connect.sh"]