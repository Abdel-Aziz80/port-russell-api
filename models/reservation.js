// Importation de mongoose pour pouvoir travailler avec MongoDB et créer des modèles
const mongoose = require('mongoose');

// Définition du schéma de réservation
const reservationSchema = mongoose.Schema(
    {
        // Identifiant unique pour la réservation
        reservationId: {
            type    : Number,   // Le type doit être un nombre
            required: true,     // Ce champ est obligatoire
            unique  : [true, "L'identifiant de la réservation doit être unique"]  // L'identifiant doit être unique dans la collection
        },

        // Numéro de la place dans le port (catway)
        catwayNumber: {
            type    : Number,   // Le type doit être un nombre
            required: true      // Ce champ est obligatoire
        },

        // Nom du client ayant effectué la réservation
        clientName: {
            type    : String,   // Le type doit être une chaîne de caractères
            trim    : true,     // Supprime les espaces inutiles avant et après le nom
            required: true      // Ce champ est obligatoire
        },

        // Nom du bateau réservé
        boatName: {
            type    : String,   // Le type doit être une chaîne de caractères
            trim    : true,     // Supprime les espaces inutiles avant et après le nom du bateau
            required: true      // Ce champ est obligatoire
        },

        // Date d'arrivée du bateau au port
        checkIn: {
            type    : Date,     // Le type doit être une date
            required: true      // Ce champ est obligatoire
        },

        // Date de départ du bateau du port
        checkOut: {
            type    : Date,     // Le type doit être une date
            required: true      // Ce champ est obligatoire
        }
    }
);

// Création du modèle 'Reservation' à partir du schéma défini
const Reservation = mongoose.model('Reservation', reservationSchema);

// Exportation du modèle afin qu'il puisse être utilisé dans d'autres fichiers (contrôleurs, routes, etc.)
module.exports = Reservation;
