// app.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env/.env') });

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
const loginRouter = require('./routes/login');
console.log('✔ loginRouter chargé'); 
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


app.use('/login', loginRouter);


app.use('/api/catways', checkJWT, catwayRouter);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/', (req, res) => {
    res.render('index', { title: 'Port de Russell' });
});

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/docs', express.static(path.join(__dirname, 'docs')));


app.use((req, res) => {
    res.status(404).json({ name: 'API', version: '1.0', status: 404, message: 'not_found' });
});

console.log('--- Routes définies ---');
app._router.stack
  .filter(r => r.route && r.route.path)
  .forEach(r => {
    const methods = Object.keys(r.route.methods).map(m => m.toUpperCase()).join(', ');
    console.log(methods.padEnd(6), r.route.path);
  });
console.log('-----------------------');


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;