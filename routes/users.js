//routes/users.js

var express = require('express');
var router = express.Router();

const service = require('../services/users');

const auth = require('../middleware/auth');

// Récupérer un utilisateur par ID
router.get('/:id', service.getById);

// Créer un nouvel utilisateur (requiert authentification)
router.post('/', auth.checkJWT, service.add);

// Mettre à jour un utilisateur par ID (requiert authentification)
router.patch('/:id', auth.checkJWT, service.update);

// Supprimer un utilisateur par ID (requiert authentification)
router.delete('/:id', auth.checkJWT, service.delete);

// Authentifier un utilisateur
router.post('/authenticate', service.authenticate);

module.exports = router;
