// //services/catways

// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const router = express.Router();
// const Catway = require('../models/catway');

// /**
//  * @route   GET /
//  * @desc    Récupère tous les catways
//  * @access  Public
//  */
// router.get('/', async (req, res) => {
//     try {
//         const catways = await Catway.find();
//         res.json(catways);
//     } catch (err) {
//         res.status(500).json({ error: 'Erreur serveur' });
//     }
// });

// /**
//  * @route   POST /add
//  * @desc    Ajoute un nouveau catway
//  * @access  Public
//  */
// router.post('/add', [
//     body('userId').notEmpty().withMessage('userId est requis'),
//     body('boatId').notEmpty().withMessage('boatId est requis'),
//     body('portId').notEmpty().withMessage('portId est requis'),
//     body('pontoonId').notEmpty().withMessage('pontoonId est requis'),
//     body('catwayId').notEmpty().withMessage('catwayId est requis'),
//     body('checkIn').isDate().withMessage('checkIn doit être une date'),
//     body('checkOut').isDate().withMessage('checkOut doit être une date'),
// ], async (req, res) => {
//     /**
//      * @param {Object} req.body
//      * @param {string} req.body.userId - ID de l'utilisateur
//      * @param {string} req.body.boatId - ID du bateau
//      * @param {string} req.body.portId - ID du port
//      * @param {string} req.body.pontoonId - ID du ponton
//      * @param {string} req.body.catwayId - ID du catway
//      * @param {string} req.body.checkIn - Date d'arrivée
//      * @param {string} req.body.checkOut - Date de départ
//      */

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { checkIn, checkOut } = req.body;

//     if (new Date(checkIn) >= new Date(checkOut)) {
//         return res.status(400).json({ error: 'La date d’arrivée doit être avant la date de départ.' });
//     }

//     try {
//         const newCatway = new Catway(req.body);
//         await newCatway.save();
//         res.status(201).json(newCatway);
//     } catch (err) {
//         res.status(500).json({ error: 'Erreur lors de l\'enregistrement' });
//     }
// });

// /**
//  * @route   PUT /update/:id
//  * @desc    Met à jour un catway existant
//  * @access  Public
//  */
// router.put('/update/:id', [
//     body('userId').notEmpty().withMessage('userId est requis'),
//     body('boatId').notEmpty().withMessage('boatId est requis'),
//     body('portId').notEmpty().withMessage('portId est requis'),
//     body('pontoonId').notEmpty().withMessage('pontoonId est requis'),
//     body('catwayId').notEmpty().withMessage('catwayId est requis'),
//     body('checkIn').isDate().withMessage('checkIn doit être une date'),
//     body('checkOut').isDate().withMessage('checkOut doit être une date'),
// ], async (req, res) => {
//     /**
//      * @param {string} req.params.id - ID du catway à modifier
//      * @param {Object} req.body - Données mises à jour
//      */

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { checkIn, checkOut } = req.body;

//     if (new Date(checkIn) >= new Date(checkOut)) {
//         return res.status(400).json({ error: 'La date d’arrivée doit être avant la date de départ.' });
//     }

//     try {
//         const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });

//         if (!updatedCatway) {
//             return res.status(404).json({ error: 'Catway introuvable' });
//         }

//         res.json(updatedCatway);
//     } catch (err) {
//         res.status(500).json({ error: 'Erreur lors de la mise à jour' });
//     }
// });

// /**
//  * @route   DELETE /delete/:id
//  * @desc    Supprime un catway existant
//  * @access  Public
//  */
// router.delete('/delete/:id', async (req, res) => {
//     /**
//      * @param {string} req.params.id - ID du catway à supprimer
//      */
//     try {
//         const deletedCatway = await Catway.findByIdAndDelete(req.params.id);

//         if (!deletedCatway) {
//             return res.status(404).json({ error: 'Catway introuvable' });
//         }

//         res.json({ message: 'Catway supprimé avec succès' });
//     } catch (err) {
//         res.status(500).json({ error: 'Erreur lors de la suppression' });
//     }
// });

// module.exports = router;
