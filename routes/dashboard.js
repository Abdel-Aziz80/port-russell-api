var express = require('express');
var router = express.Router();

const service = require('../services/dashboard');
const auth = require('../middleware/auth');

console.log('Service functions:', service);
console.log('Auth middleware:', auth);

// Log pour une fonction spécifique
console.log('Dashboard function:', service.dashboard);
console.log('UpdateUser function:', service.updateUser);
console.log('UpdateUserById function:', service.updateUserById);
console.log('DeleteUser function:', service.deleteUser);
console.log('GetCatwayById function:', service.getCatwayById);
console.log('UpdateCatwayById function:', service.updateCatwayById);
console.log('DeleteCatway function:', service.deleteCatway);
console.log('AddReservation function:', service.addReservation);
console.log('GetReservationInfo function:', service.getReservationInfo);
console.log('DeleteReservation function:', service.deleteReservation);



/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Routes liées à l'administration (utilisateurs, catways, réservations)
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Accéder au tableau de bord
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Accès autorisé au dashboard
 *       401:
 *         description: Non autorisé
 */
router.get('/', auth.checkJWT, service.dashboard);

/**
 * @swagger
 * /dashboard/updateUser:
 *   post:
 *     summary: Mettre à jour les informations d'un utilisateur
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 */
router.post('/updateUser', auth.checkJWT, service.updateUser);

/**
 * @swagger
 * /dashboard/updateUser/{id}:
 *   post:
 *     summary: Mettre à jour un utilisateur par ID
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 */
router.post('/updateUser/:id', auth.checkJWT, service.updateUserById);

/**
 * @swagger
 * /dashboard/deleteUser:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 */
router.delete('/deleteUser', auth.checkJWT, service.deleteUser);

/**
 * @swagger
 * /dashboard/getCatway/{id}:
 *   get:
 *     summary: Récupérer les informations d'un catway
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du catway
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Données du catway récupérées
 */
router.get('/getCatway/:id', auth.checkJWT, service.getCatwayById);

/**
 * @swagger
 * /dashboard/updateCatway/{id}:
 *   post:
 *     summary: Mettre à jour un catway par ID
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du catway
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Catway mis à jour
 */
router.post('/updateCatway/:id', auth.checkJWT, service.updateCatwayById);

/**
 * @swagger
 * /dashboard/deleteCatway/{id}:
 *   delete:
 *     summary: Supprimer un catway par ID
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du catway
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catway supprimé
 */
router.delete('/deleteCatway/:id', auth.checkJWT, service.deleteCatway);

/**
 * @swagger
 * /dashboard/addReservation:
 *   post:
 *     summary: Ajouter une réservation
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Réservation ajoutée
 */
router.post('/addReservation', auth.checkJWT, service.addReservation);

/**
 * @swagger
 * /dashboard/getReservationInfo/{id}:
 *   get:
 *     summary: Récupérer les informations d'une réservation
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la réservation
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informations de la réservation récupérées
 */
router.get('/getReservationInfo/:id', auth.checkJWT, service.getReservationInfo);

/**
 * @swagger
 * /dashboard/deleteReservation/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la réservation
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation supprimée
 */
router.delete('/deleteReservation/:id', auth.checkJWT, service.deleteReservation);

module.exports = router;