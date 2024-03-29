const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bán Account API',
      version: '1.0.0',
      description: 'Nodejs using swagger create by chithien-day',
    },
    components: {
      securitySchemes: {
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
          }
        }
      },
    security: [{
      bearerAuth: []
    }],
    servers: [
      {
        url: "http://localhost:8080/api",
      },
    ],
  },
  apis: ["./app/routes/*.js"],
};

const specs = swaggerJSDoc(options);

module.exports = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
};