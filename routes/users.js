var express = require('express');
var router = express.Router();

const service = require('../services/users');
const auth = require('../middleware/auth');

// ✅ Authentifier un utilisateur (doit venir avant /:id)
router.post('/authenticate', service.authenticate);

// ✅ Créer un nouvel utilisateur (requiert authentification)
router.post('/', auth.checkJWT, service.add);

// ✅ Mettre à jour un utilisateur par ID (requiert authentification)
router.patch('/:id', auth.checkJWT, service.update);

// ✅ Supprimer un utilisateur par ID (requiert authentification)
router.delete('/:id', auth.checkJWT, service.delete);

// ✅ Récupérer un utilisateur par ID (placé en dernier)
router.get('/:id', service.getById);

module.exports = router;
