FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .

ARG REACT_APP_API_URL
ARG REACT_APP_COGNITO_CLIENT_ID
ARG REACT_APP_COGNITO_USER_POOL_ID

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_COGNITO_CLIENT_ID=$REACT_APP_COGNITO_CLIENT_ID
ENV REACT_APP_COGNITO_USER_POOL_ID=$REACT_APP_COGNITO_USER_POOL_ID

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
