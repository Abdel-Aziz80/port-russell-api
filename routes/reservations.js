// Importation du module express pour la création de routes
var express = require('express');
var router = express.Router();

// Importation des services de réservation
const service = require('../services/reservations');

// Importation du middleware d'authentification pour protéger les routes
const auth = require('../middleware/auth');

// Route GET pour récupérer toutes les réservations d'un utilisateur spécifique
// Cette route utilise un middleware `checkJWT` pour vérifier que l'utilisateur est authentifié
router.get('/:id/reservations', auth.checkJWT, service.getAll);

// Route GET pour récupérer une réservation spécifique par son ID
// Cette route utilise également le middleware `checkJWT` pour vérifier l'authentification de l'utilisateur
router.get('/:id/reservations/:idReservation', auth.checkJWT, service.getById);

// Route POST pour ajouter une nouvelle réservation
// Cette route utilise le middleware `checkJWT` pour s'assurer que l'utilisateur est authentifié
router.post('/:id/reservations', auth.checkJWT, service.add);

// Route PATCH pour mettre à jour une réservation existante
// Elle utilise le middleware `checkJWT` pour vérifier l'authentification de l'utilisateur
router.patch('/:id/reservations/:idReservation', auth.checkJWT, service.update);

// Route DELETE pour supprimer une réservation existante
// Le middleware `checkJWT` est également utilisé pour vérifier que l'utilisateur est authentifié
router.delete('/:id/reservations/:idReservation', auth.checkJWT, service.delete);

// Exportation du module router pour l'utiliser dans le fichier principal de l'application
module.exports = router;
