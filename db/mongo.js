//db/mogo.js

const { ServerApiVersion} = require('mongodb');
const mongoose = require('mongoose');

const clientOption = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOption)
        console.log("MongoDB connecté avec succès !");
    } catch (error) {
        console.log('Erreur de connexion MongoDB :', error.message);
        throw error
    }
}