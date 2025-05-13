const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Port de Russell API',
      version: '1.0.0',
      description: 'Documentation de l\'API du port de Russell',
    },
    servers: [
      {
        url: 'http://localhost:3000/port-russell-api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/**/*.js'),
  ],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
