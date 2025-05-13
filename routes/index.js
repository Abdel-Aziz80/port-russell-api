//routes/index.js

var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const catwayRoute = require('../routes/catway');
const reservationsRoute = require('../routes/reservations');
const dashboardRoute = require('../routes/dashboard');

router.use('/users', userRoute);
router.use('/catway', catwayRoute);
router.use('/reservations', reservationsRoute);
router.use('/dashboard', dashboardRoute);

module.exports = router;
