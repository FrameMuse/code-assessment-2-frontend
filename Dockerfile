# Source: https://www.tomray.dev/nestjs-docker-compose-postgres

# ONLY CREATES A BUILD

FROM node:14 as build

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Bundle app source
COPY --chown=node:node . .

# Running `npm ci` removes the existing node_modules directory.
# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
RUN npm ci --only=production && npm cache clean --force

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Use the node user from the image (instead of the root user)
USER node

# SERVES A BUILD

FROM node:14 as production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/build ./build

RUN npm i --silent -g serve

USER node

# Serve command
CMD [ "serve", "-s", "build" ]
