# Estágio 1: Build
FROM node:20-alpine AS builder

# Defina o diretório de trabalho
WORKDIR /app

# Copie package.json para otimizar o cache
COPY package.json ./

# Instale as dependências usando npm
RUN npm install

# Copie o resto do código-fonte
COPY . .

# Execute o build do Vite
RUN npm run build

# Estágio 2: Serve com NGINX
FROM nginx:alpine

# Copie os arquivos estáticos da pasta dist para o diretório do NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# O NGINX já tem seu próprio CMD, então não precisamos definir