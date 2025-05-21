// app.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env/.env') });

const mongoose = require('mongoose');
console.log('URL_MONGO:', process.env.URL_MONGO);

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken'); 
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { checkJWT } = require('./middleware/auth');

const indexRouter = require('./routes/index');
const catwayRouter = require('./routes/catway');
const dashboardRouter = require('./routes/dashboard');
const usersAuthRouter = require('./routes/usersAuth');
console.log('✔ usersAuth routeur chargé'); 
const mongodb = require('./db/mongo');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}));


app.use(logger('dev'));
app.use(cookieParser());


app.use('/users', usersAuthRouter);
app.post('/login-debug', (req, res) => {
  res.json({ message: 'debug ok' });
});

app.set('views', path.join(__dirname, 'views')); // dossier contenant les .pug
app.set('view engine', 'pug');   

app.use('/api/catways', checkJWT, catwayRouter);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/',(req, res, next) => {
    res.render('index', { title: 'Port de Russell' });
  });


app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/docs', express.static(path.join(__dirname, 'docs')));


app.use((req, res) => {
    res.status(404).json({ name: 'API', version: '1.0', status: 404, message: 'not_found' });
});

function listAllRoutes(app) {
  const routes = [];

  app._router.stack.forEach(middleware => {
    if (middleware.route) {
      // Route directe
      routes.push({
        method: Object.keys(middleware.route.methods)[0].toUpperCase(),
        path: middleware.route.path,
      });
    } else if (middleware.name === 'router' && middleware.handle.stack) {
      // Sous-router
      middleware.handle.stack.forEach(handler => {
        if (handler.route) {
          const basePath = middleware.regexp?.toString()
            .replace('/^\\', '/')
            .replace('\\/?(?=\\/|$)/i', '')
            .replace(/\\\//g, '/')
            .replace(/\/$/, '');
          const fullPath = basePath + handler.route.path;
          routes.push({
            method: Object.keys(handler.route.methods)[0].toUpperCase(),
            path: fullPath,
          });
        }
      });
    }
  });

  console.log('--- Routes détectées ---');
  routes.forEach(r => console.log(r.method.padEnd(6), r.path));
  console.log('-------------------------');
}

listAllRoutes(app);


mongoose.connect(process.env.URL_MONGO)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => {
    console.error('Erreur connexion MongoDB:', err);
    process.exit(1);
  });

module.exports = app;