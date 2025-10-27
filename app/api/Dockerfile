# Use uma imagem base leve do Node.js
FROM node:20-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json primeiro para otimizar o cache de camadas
COPY package.json ./

# Instale as dependências
RUN npm install

# Copie o resto do código-fonte
COPY . .

# Exponha a porta 8080
EXPOSE 8080

# Defina o comando de inicialização
CMD ["node", "server.js"]
