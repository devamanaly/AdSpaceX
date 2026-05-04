FROM node:18-alpine

WORKDIR /app

# Install Prisma CLI globally for generate and migrate commands
RUN npm install -g prisma

COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma client (needed before build)
RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "run", "dev"]