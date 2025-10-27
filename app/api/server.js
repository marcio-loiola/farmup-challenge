// Servidor principal da API REST de Clientes
// Configuração do Express e inicialização do servidor

const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const clientesRoutes = require("./routes/clientes");

const app = express();
const PORT = process.env.PORT || 8080;

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Clientes - FarmUp Challenge",
      version: "1.0.0",
      description: "API REST para gerenciamento de clientes com recursos bônus",
      contact: {
        name: "FarmUp Team",
        email: "team@farmup.com"
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Servidor de desenvolvimento"
      }
    ],
    components: {
      schemas: {
        Cliente: {
          type: "object",
          required: ["nome", "email", "telefone", "cidade"],
          properties: {
            id: {
              type: "integer",
              description: "ID único do cliente (gerado automaticamente)",
              example: 1
            },
            nome: {
              type: "string",
              description: "Nome completo do cliente",
              example: "João Silva"
            },
            email: {
              type: "string",
              format: "email",
              description: "Endereço de email único",
              example: "joao@exemplo.com"
            },
            telefone: {
              type: "string",
              description: "Número de telefone com formatação",
              example: "(11) 98765-4321"
            },
            cidade: {
              type: "string",
              description: "Cidade de residência",
              example: "São Paulo"
            }
          }
        },
        ClienteInput: {
          type: "object",
          required: ["nome", "email", "telefone", "cidade"],
          properties: {
            nome: {
              type: "string",
              description: "Nome completo do cliente",
              example: "Ana Costa"
            },
            email: {
              type: "string",
              format: "email",
              description: "Endereço de email único",
              example: "ana@teste.com"
            },
            telefone: {
              type: "string",
              description: "Número de telefone com formatação",
              example: "(11) 99999-8888"
            },
            cidade: {
              type: "string",
              description: "Cidade de residência",
              example: "São Paulo"
            }
          }
        },
        Error: {
          type: "object",
          properties: {
            erro: {
              type: "string",
              description: "Mensagem de erro",
              example: "Cliente não encontrado"
            }
          }
        },
        ApiInfo: {
          type: "object",
          properties: {
            mensagem: {
              type: "string",
              example: "API de Clientes - FarmUp Challenge"
            },
            endpoints: {
              type: "object",
              properties: {
                listar: { type: "string", example: "GET /clientes" },
                buscar: { type: "string", example: "GET /clientes/:id" },
                criar: { type: "string", example: "POST /clientes" },
                atualizar: { type: "string", example: "PUT /clientes/:id" },
                remover: { type: "string", example: "DELETE /clientes/:id" }
              }
            }
          }
        }
      }
    }
  },
  apis: ["./routes/*.js", "./server.js"]
};

const specs = swaggerJsdoc(swaggerOptions);

// Middleware para CORS (permitir requisições do cliente React)
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Documentação Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "API de Clientes - FarmUp Challenge"
}));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Informações da API
 *     description: Retorna informações básicas sobre a API e seus endpoints
 *     tags: [Sistema]
 *     responses:
 *       200:
 *         description: Informações da API
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiInfo'
 */
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Clientes - FarmUp Challenge",
    endpoints: {
      listar: "GET /clientes",
      buscar: "GET /clientes/:id",
      criar: "POST /clientes",
      atualizar: "PUT /clientes/:id",
      remover: "DELETE /clientes/:id",
    },
    documentacao: `GET /docs - Documentação Swagger`
  });
});

// Registra as rotas de clientes
app.use("/clientes", clientesRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação Swagger: http://localhost:${PORT}/docs`);
  console.log("Use Ctrl+C para parar o servidor");
});
