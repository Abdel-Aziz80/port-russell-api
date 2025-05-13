//routes/catway.js

var express = require('express');
var router = express.Router();

const catways = require('../controllers/catways');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: API de gestion des catways
 */

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupérer tous les catways
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des catways récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Non autorisé
 */
router.get('/', auth.checkJWT, catways.getAll);

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupérer un catway par ID
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du catway
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catway trouvé
 *       404:
 *         description: Catway non trouvé
 *       401:
 *         description: Non autorisé
 */
router.get('/:id', auth.checkJWT, catways.getById);

/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Ajouter un nouveau catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Quai Alpha
 *               location:
 *                 type: string
 *                 example: Zone Nord
 *     responses:
 *       201:
 *         description: Catway ajouté
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 */
router.post('/', auth.checkJWT, catways.add);

/**
 * @swagger
 * /catways/{id}:
 *   patch:
 *     summary: Mettre à jour un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Quai Bravo
 *               location:
 *                 type: string
 *                 example: Zone Sud
 *     responses:
 *       200:
 *         description: Catway mis à jour
 *       404:
 *         description: Catway non trouvé
 *       401:
 *         description: Non autorisé
 */
router.patch('/:id', auth.checkJWT, catways.update);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprimer un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du catway
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Supprimé avec succès
 *       404:
 *         description: Catway non trouvé
 *       401:
 *         description: Non autorisé
 */
router.delete('/:id', auth.checkJWT, catways.delete);

module.exports = router;
