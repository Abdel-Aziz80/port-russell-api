// routes/catway.js

// Importation des modules nécessaires
var express = require('express');
var router = express.Router();

// Importation du controllers de gestion des catways
const catways = require('../controllers/catways');

// Middleware d'authentification
const auth = require('../middleware/auth');

// Route pour récupérer tous les catways
// Cette route est protégée par un token JWT
router.get('/', auth.checkJWT, catways.getAll);

// Route pour récupérer un catway par son ID
// Cette route nécessite également un token JWT valide
router.get('/:id', auth.checkJWT, catways.getById);

// Route pour ajouter un nouveau catway
// Cette route nécessite un token JWT valide pour l'authentification
router.post('/', auth.checkJWT, catways.add);

// Route pour mettre à jour un catway existant
// Cette route est protégée par un token JWT
router.patch('/:id', auth.checkJWT, catways.update);

// Route pour supprimer un catway
// Cette route est protégée par un token JWT
router.delete('/:id', auth.checkJWT, catways.delete);

// Export du module pour l'utiliser dans d'autres fichiers

module.exports = router;
