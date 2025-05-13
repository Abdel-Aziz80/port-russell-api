//services/reservation

const Reservation = require('../models/reservation');
const Catway = require('../models/catway');
const { body, validationResult } = require('express-validator');


/**
 * Récupère toutes les réservations et un catway spécifique.
 * @function
 * @async
 * @param {Object} req - L'objet de requête HTTP. Récupère l'id d'un catway dans l'url.
 * @param {Object} res - L'objet de réponse HTTP. Fait le rendu de la page Réservation.
 * @param {Function} next - La fonction middleware suivante.
 */
exports.getAll = async (req, res, next) => {
    try {
        const id = req.params.id
        let reservation = await Reservation.find({});
        let catway = await Catway.findById(id);
        
        if (reservation) {
            return res.render('reservation', { title: 'Réservation', reservation: reservation, catway: catway });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

/**
 * Récupère une réservation spécifique par son ID et le catway associé.
 * @function
 * @async
 * @param {Object} req - L'objet de requête HTTP. Récupère l'id d'un catways et l'id d'une réservation dans l'url.
 * @param {Object} res - L'objet de réponse HTTP. Fait le rendu de la page Information de la réservation
 * @param {Function} next - La fonction middleware suivante.
 */
exports.getById = async (req, res, next) => {
    const id = req.params.id
    const idReservation = req.params.idReservation 

    try {
        let catway = await Catway.findById(id);

        if (catway) {
            let reservation = await Reservation.findById(idReservation)
                if (reservation) {
                    //res.status(200).json(reservation);
                    return res.render('reservationInfo', { title: 'Information réservation', reservation: reservation, catway: catway })
                }
            return res.status(404).json("Aucune réservation trouvé");
        }

        return res.status(404).json('catway-not-found');
    } catch (error) {
        return res.status(500).json(error);
    }
}

/**
 * Ajoute une nouvelle réservation.
 * @function
 * @async
 * @param {Object} req - L'objet de requête HTTP. Récupère les champs nécessaire à la création (reservationId, clientName, boatName, checkIn, checkOut) dans le corp de la requette.
 * @param {Object} res - L'objet de réponse HTTP. Renvoie le status de la requette 200 si tout c'est bien passé, 400 ou 500 si une erreur est apparu.
 * @param {Function} next - La fonction middleware suivante.
 */
exports.add = [
    // Définition des règles de validation
        body('reservationId').isNumeric().withMessage("L'id de réservation doit être un nombre."),
        body('clientName').trim().isLength({ min: 3 }).withMessage('Le nom du client doit contenir au moins 3 caractères'),
        body('boatName').trim().isLength({ min: 3 }).withMessage('Le nom du bâteau doit contenir au moins 3 caractères'),
        body('checkIn').isDate().withMessage('checkIn doit être une date'),
        body('checkOut').isDate().withMessage('checkOut doit être une date'),

    // Fonction de traitement de la requête
    async (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        let catway = await Catway.findById(id);

        if (catway) {
            const temp = ({
                reservationId: req.body.reservationId,
                catwayNumber: catway.catwayNumber,
                clientName: req.body.clientName,
                boatName: req.body.boatName,
                checkIn: req.body.checkIn,
                checkOut: req.body.checkOut
            })
    
            try {
                let reservation = await Reservation.create(temp);
    
                return res.status(201).json(reservation);
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
];

/**
 * Met à jour une réservation existante.
 * @function
 * @async
 * @param {Object} req - L'objet de requête HTTP. Récupère les champs nécessaire à la création (reservationId, clientName, boatName, checkIn, checkOut) dans le corp de la requette.
 * @param {Object} res - L'objet de réponse HTTP. Revoie les message de succés ou d'erreur selon l'échec ou la réussite de la requette.
 * @param {Function} next - La fonction middleware suivante.
 */
exports.update = [
    // Définition des règles de validation
    body('reservationId').optional().isNumeric().withMessage("L'id de réservation doit être un nombre."),
    body('clientName').trim().optional().isLength({ min: 3 }).withMessage('Le nom du client doit contenir au moins 3 caractères'),
    body('boatName').trim().optional().isLength({ min: 3 }).withMessage('Le nom du bâteau doit contenir au moins 3 caractères'),
    body('checkIn').optional().isDate().withMessage('checkIn doit être une date'),
    body('checkOut').optional().isDate().withMessage('checkOut doit être une date'),

    // Fonction de traitement de la requête
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        let catway = await Catway.findById(id);

        if (catway) {
            const temp = ({
                reservationId: req.body.reservationId,
                catwayNumber: catway.catwayNumber,
                clientName: req.body.clientName,
                boatName: req.body.boatName,
                checkIn: req.body.checkIn,
                checkOut: req.body.checkOut
            })
    
            const idReservation = req.params.idReservation;
    
            try {
                let reservation = await Reservation.findById(idReservation);
    
                if (reservation) {
                    Object.keys(temp).forEach((key) => {
                        if (!!temp[key]) {
                            reservation[key] = temp[key];
                        }
                    });
    
                    await reservation.save();
                    return res.status(201).json(reservation);
                }
    
                return res.status(404).json("reservation_not_found");
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
];

/**
 * Supprime une réservation.
 * @function
 * @async
 * @param {Object} req - L'objet de requête HTTP. Récupère l'id du catwayt ainsi que l'id de la réservation dans l'URL de la requette 
 * @param {Object} res - L'objet de réponse HTTP. Renvoie les codes correspondant à un succés ou à un echec. 
 * @param {Function} next - La fonction middleware suivante.
 */
exports.delete = async (req, res, next) => {
    const id = req.params.id;
    let catway = await Catway.findById(id);

    if (catway) {
        const idReservation = req.params.idReservation;

        try {
            await Reservation.deleteOne({ _id: idReservation });
    
            return res.status(204).json('delete_ok');
        } catch (error) {
            return res.status(500).json(error)
        }
    }
};


 /**
 * Récupère toutes les réservations ou une réservation spécifique par son ID et le catway associé.
 * @function
 * @async
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @param {Function} next - La fonction middleware suivante.
 */
exports.getReservation = async (req, res, next) => {
    try {
        const id = req.params.id;
        const idReservation = req.params.idReservation;

        let catway = await Catway.findById(id);

        if (!catway) {
            return res.status(404).json('catway-not-found');
        }

        if (idReservation) {
            let reservation = await Reservation.findById(idReservation);
            if (!reservation) {
                return res.status(404).json("Aucune réservation trouvé");
            }
            return res.render('reservationInfo', { title: 'Information réservation', reservation: reservation, catway: catway });
        } else {
            let reservation = await Reservation.find({});
            return res.render('reservation', { title: 'Réservation', reservation: reservation, catway: catway });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

/**
 * Récupère une réservation spécifique par son ID et le catway associé.
 * @function
 * @async
 * @param {Object} req - L'objet de requête HTTP. Récupère l'id d'un catways et l'id d'une réservation dans l'url.
 * @param {Object} res - L'objet de réponse HTTP. Fait le rendu de la page Information de la réservation
 * @param {Function} next - La fonction middleware suivante.
 */
exports.getById = async (req, res, next) => {
    const id = req.params.id
    const idReservation = req.params.idReservation 

    try {
        let catway = await Catway.findById(id);

        if (catway) {
            let reservation = await Reservation.findById(idReservation)
                if (reservation) {
                    //res.status(200).json(reservation);
                    return res.render('reservationInfo', { title: 'Information réservation', reservation: reservation, catway: catway })
                }
            return res.status(404).json("Aucune réservation trouvé");
        }

        return res.status(404).json('catway-not-found');
    } catch (error) {
        return res.status(500).json(error);
    }
}

/**
 * Ajoute une nouvelle réservation.
 * @function
 * @async
 * @param {Object} req - L'objet de requête HTTP. Récupère les champs nécessaire à la création (reservationId, clientName, boatName, checkIn, checkOut) dans le corp de la requette.
 * @param {Object} res - L'objet de réponse HTTP. Renvoie le status de la requette 200 si tout c'est bien passé, 400 ou 500 si une erreur est apparu.
 * @param {Function} next - La fonction middleware suivante.
 */
exports.add = [
    // Définition des règles de validation
        body('reservationId').isNumeric().withMessage("L'id de réservation doit être un nombre."),
        body('clientName').trim().isLength({ min: 3 }).withMessage('Le nom du client doit contenir au moins 3 caractères'),
        body('boatName').trim().isLength({ min: 3 }).withMessage('Le nom du bâteau doit contenir au moins 3 caractères'),
        body('checkIn').isDate().withMessage('checkIn doit être une date'),
        body('checkOut').isDate().withMessage('checkOut doit être une date'),

    // Fonction de traitement de la requête
    async (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        let catway = await Catway.findById(id);

        if (catway) {
            const temp = ({
                reservationId: req.body.reservationId,
                catwayNumber: catway.catwayNumber,
                clientName: req.body.clientName,
                boatName: req.body.boatName,
                checkIn: req.body.checkIn,
                checkOut: req.body.checkOut
            })
    
            try {
                let reservation = await Reservation.create(temp);
    
                return res.status(201).json(reservation);
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
];

/**
 * Met à jour une réservation existante.
 * @function
 * @async
 * @param {Object} req - L'objet de requête HTTP. Récupère les champs nécessaire à la création (reservationId, clientName, boatName, checkIn, checkOut) dans le corp de la requette.
 * @param {Object} res - L'objet de réponse HTTP. Revoie les message de succés ou d'erreur selon l'échec ou la réussite de la requette.
 * @param {Function} next - La fonction middleware suivante.
 */
exports.update = [
    // Définition des règles de validation
    body('reservationId').optional().isNumeric().withMessage("L'id de réservation doit être un nombre."),
    body('clientName').trim().optional().isLength({ min: 3 }).withMessage('Le nom du client doit contenir au moins 3 caractères'),
    body('boatName').trim().optional().isLength({ min: 3 }).withMessage('Le nom du bâteau doit contenir au moins 3 caractères'),
    body('checkIn').optional().isDate().withMessage('checkIn doit être une date'),
    body('checkOut').optional().isDate().withMessage('checkOut doit être une date'),

    // Fonction de traitement de la requête
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        let catway = await Catway.findById(id);

        if (catway) {
            const temp = ({
                reservationId: req.body.reservationId,
                catwayNumber: catway.catwayNumber,
                clientName: req.body.clientName,
                boatName: req.body.boatName,
                checkIn: req.body.checkIn,
                checkOut: req.body.checkOut
            })
    
            const idReservation = req.params.idReservation;
    
            try {
                let reservation = await Reservation.findById(idReservation);
    
                if (reservation) {
                    Object.keys(temp).forEach((key) => {
                        if (!!temp[key]) {
                            reservation[key] = temp[key];
                        }
                    });
    
                    await reservation.save();
                    return res.status(201).json(reservation);
                }
    
                return res.status(404).json("reservation_not_found");
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
];

/**
 * Supprime une réservation.
 * @function
 * @async
 * @param {Object} req - L'objet de requête HTTP. Récupère l'id du catwayt ainsi que l'id de la réservation dans l'URL de la requette 
 * @param {Object} res - L'objet de réponse HTTP. Renvoie les codes correspondant à un succés ou à un echec. 
 * @param {Function} next - La fonction middleware suivante.
 */
exports.delete = async (req, res, next) => {
    const id = req.params.id;
    let catway = await Catway.findById(id);

    if (catway) {
        const idReservation = req.params.idReservation;

        try {
            await Reservation.deleteOne({ _id: idReservation });
    
            return res.status(204).json('delete_ok');
        } catch (error) {
            return res.status(500).json(error)
        }
    }
};