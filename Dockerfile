FROM node:14-alpine

# Create app directory
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install pm2 -g

#RUN npm config set package-lock false

#RUN npm install webpack -g

#RUN npm install ts-node --save-dev

#RUN npm install typescript -g 

#RUN npm install typescript --save-dev


#RUN npm install -g ts-node


#RUN tsc --init

RUN npm install -f




# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

# CMD ["pm2-runtime","index.js","--max-http-header-size=100000"]
#RUN tsc

###CMD ["npm","start","serve"]
###RUN npm run setup

RUN npm run build --max-old-space-size=4096

CMD ["npm","run","start"]
