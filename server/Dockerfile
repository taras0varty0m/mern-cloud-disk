FROM node

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn config set strict-ssl false
RUN yarn config set registry https://registry.npmjs.org
RUN yarn

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["yarn","start"]