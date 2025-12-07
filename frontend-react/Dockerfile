FROM node:20

WORKDIR /app

# Copy manifests first
COPY package.json package-lock.json ./

# Install dependencies (Tailwind included)
RUN npm install

# Copy the rest of the app
COPY . .

CMD ["npm", "start"]
