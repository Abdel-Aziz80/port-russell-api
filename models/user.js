// Importation de mongoose pour pouvoir travailler avec MongoDB et créer des modèles
const mongoose = require('mongoose');
// Importation de bcrypt pour sécuriser les mots de passe des utilisateurs
const bcrypt = require('bcryptjs');

/**
 * Schéma pour la gestion des utilisateurs du port de plaisance
 * @module models/user
 */
const userSchema = mongoose.Schema({
    /**
     * Nom de l'utilisateur
     * @type {String}
     * @required - Le nom est obligatoire
     * @trim - Supprime les espaces inutiles avant et après
     */
    name: {
        type    : String,      // Le type doit être une chaîne de caractères
        trim    : true,        // Supprime les espaces inutiles avant et après
        required: [true, 'Le nom est requis.']  // Champ obligatoire
    },

    /**
     * Adresse email de l'utilisateur
     * @type {String}
     * @required - L'email est obligatoire
     * @unique - L'email doit être unique dans la base de données
     * @lowercase - Convertit l'email en minuscules
     * @trim - Supprime les espaces inutiles avant et après
     */
    email: {
        type     : String,       // Le type doit être une chaîne de caractères
        trim     : true,         // Supprime les espaces inutiles avant et après
        required : [true, "L'email est requis."],  // Champ obligatoire
        unique   : true,         // L'email doit être unique
        lowercase: true          // Convertit l'email en minuscules pour uniformité
    },

    /**
     * Mot de passe de l'utilisateur
     * @type {String}
     * @trim - Supprime les espaces inutiles avant et après
     */
    password: {
        type   : String,   // Le type doit être une chaîne de caractères
        trim   : true      // Supprime les espaces inutiles avant et après
    }
});

/**
 * Middleware qui hache le mot de passe avant de sauvegarder l'utilisateur dans la base de données
 * Utilisation de bcrypt pour hasher le mot de passe avec un salage de 10
 * @function
 * @param {function} next - Fonction pour passer au middleware suivant
 */
userSchema.pre('save', function(next) {
    // Si le mot de passe n'a pas été modifié, on passe directement au middleware suivant
    if (!this.isModified('password')) {
        return next();
    }

    // Hashage du mot de passe avant de le sauvegarder
    this.password = bcrypt.hashSync(this.password, 10);

    next();
});

// Création du modèle 'User' à partir du schéma défini
const User = mongoose.model('User', userSchema);

// Exportation du modèle pour qu'il puisse être utilisé dans d'autres fichiers (contrôleurs, routes, etc.)
module.exports = User;
