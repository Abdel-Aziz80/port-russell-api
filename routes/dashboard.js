// routes/dashboard

var express = require('express');
var router = express.Router();

const service = require('../services/dashboard');
const auth = require('../middleware/auth');

// Accès au tableau de bord
router.get('/', auth.checkJWT, service.dashboard);

// Mettre à jour un utilisateur (sans ID en paramètre)
router.post('/updateUser', auth.checkJWT, service.updateUser);

// Mettre à jour un utilisateur par ID
router.post('/updateUser/:id', auth.checkJWT, service.updateUserById);

// Supprimer un utilisateur
router.get('/deleteUser/', auth.checkJWT, service.deleteUser);

// Modifier un catway par ID (GET pour chargement)
router.get('/updateCatway/:id', auth.checkJWT, service.updateCatway);

// Modifier un catway par ID (POST pour mise à jour)
router.post('/updateCatway/:id', auth.checkJWT, service.updateCatwayById);

// Supprimer un catway par ID
router.get('/deleteCatway/:id', auth.checkJWT, service.deleteCatway);

// Ajouter une réservation
router.post('/addReservation', auth.checkJWT, service.addReservation);

// Récupérer les infos d'une réservation
router.get('/getReservationInfo/:id', auth.checkJWT, service.getReservationInfo);

// Supprimer une réservation
router.get('/deleteReservation/:id', auth.checkJWT, service.deleteReservation);

module.exports = router;
