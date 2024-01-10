    FROM node:14.17.1 as builder

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install --verbose
#RUN npm update --verbose
##RUN mkdir /app
##RUN mv -v -f ./node_modules ./app

##WORKDIR /app
COPY . .

RUN npm run build

EXPOSE 3000

# ------------------------------------------------------
# Deploy using nginx
# ------------------------------------------------------
#FROM nginx:1.16.1
#COPY --from=builder /app/out /usr/share/nginx/html
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/conf.d
#EXPOSE 80
CMD ["npm", "run", "dev"]
