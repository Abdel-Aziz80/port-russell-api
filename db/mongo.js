const { ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

/**
 * Options de connexion pour le client MongoDB avec l'API server v1.
 * @type {Object}
 */
const clientOption = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

/**
 * Initialise la connexion à la base de données MongoDB via Mongoose.
 * Utilise l'URL définie dans la variable d'environnement `URL_MONGO`.
 *
 * @async
 * @function initClientDbConnection
 * @throws {Error} En cas d'échec de connexion, une erreur est levée.
 * @returns {Promise<void>} Résout si la connexion réussit.
 */
exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOption);
        console.log("MongoDB connecté avec succès !");
    } catch (error) {
        console.log('Erreur de connexion MongoDB :', error.message);
        throw error;
    }
};
