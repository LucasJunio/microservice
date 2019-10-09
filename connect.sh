#!/bin/bash
PASSWORD="Energia@19"
USER="ps5857"
SERVER="fln.engiebrasil.com.br"

echo $PASSWORD | openconnect --protocol=gp $SERVER --user=$USER --no-dtls --passwd-on-stdin -b

sleep 10

node server.js