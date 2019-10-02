FROM docker-registry-default.ds55.local/engie-dev/node:10

WORKDIR /src/app

# Install deps for production only
COPY ./package* ./
RUN npm install && \
  npm cache clean --force

# Copy builded source from the upper builder stage
COPY  . .

EXPOSE 80

# Start the app
CMD ["npm", "run", "start-prod"]