var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const reservationsRoute = require('../routes/reservations');



router.use('/users', userRoute);
router.use('/reservations', reservationsRoute);

module.exports = router;
