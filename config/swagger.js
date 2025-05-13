// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API du Port de Plaisance de Russell',
      version: '1.0.0',
      description: 'Documentation de l\'API pour la gestion des catways, utilisateurs et réservations'
    },
    servers: [
      {
        url: 'http://localhost:3000', // à adapter selon ton URL de prod plus tard
      }
    ]
  },
  apis: ['./routes/*.js', './models/*.js'], // chemins des fichiers contenant les commentaires JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
