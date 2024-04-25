FROM node:19.5.0-alpine
WORKDIR /apps
ENV NODE_ENV=production
ADD . . 
RUN npm install express
RUN npm install axios
CMD npm start