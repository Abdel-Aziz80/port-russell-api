// Importation de mongoose pour pouvoir travailler avec MongoDB et créer des modèles
const mongoose = require('mongoose');


/**
 * Schéma pour la gestion des catways (places dans le port)
 * @module models/catway
 */

const catwaySchema = mongoose.Schema(
    {
        /**
         * Numéro de la place dans le port
         * @type {Number}
         * @required
         */
        catwayNumber: {
            type    : Number,  // Le type doit être un nombre
            required: true     // Ce champ est obligatoire
        },

        /**
         * Type de la place : peut être "long" ou "short"
         * @type {String}
         * @required
         * @enum {long, short} - Le type doit être l'un de ces deux choix
         * @lowercase - La valeur doit être convertie en minuscules
         */
        type: {
            type     : String,      // Le type doit être une chaîne de caractères
            required : true,        // Ce champ est obligatoire
            lowercase: true,        // Conversion automatique en minuscules
            enum     : ['long', 'short'], // Valeurs possibles : 'long' ou 'short'
            message  : "Must be long or short." // Message d'erreur personnalisé si la valeur n'est pas valide
        },

        /**
         * État de la place (par exemple, "libre", "occupée", "réservée", etc.)
         * @type {String}
         * @trim - Supprime les espaces inutiles
         */
        catwayState: {
            type: String,   // Le type doit être une chaîne de caractères
            trim: true      // Supprime les espaces inutiles avant et après
        }
    }
);

// Création du modèle 'Catway' à partir du schéma défini
const Catway = mongoose.model('Catway', catwaySchema);

// Exportation du modèle pour qu'il puisse être utilisé dans d'autres fichiers (contrôleurs, routes, etc.)
module.exports = Catway;
