// middleware/auth.js

const jwt = require('jsonwebtoken');

/**
 * Vérifie le jeton JWT dans les cookies ou les en-têtes de la requête.
 * @function
 * @async
 * @param {Object} req - L'objet de la requête HTTP. Avec le token récupéré dans le cookie ou dans l'en-tête de la requête.
 * @param {Object} res - L'objet de réponse HTTP.
 * @param {function} next - La fonction middleware suivante.
 */

exports.checkJWT = async (req, res, next) => {
    let token = req.cookies.token || req.headers['authorization'];

    // Vérification si le token commence par "Bearer"
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7); // Supprime "Bearer " pour ne garder que le token
    }

    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if (error) {
                return res.status(401).json('token_not_valid');
            } else {
                req.decoded = decoded;

                // Renouvellement du token (session glissante)
                const expiresIn = 24 * 60 * 60;
                const newToken = jwt.sign({
                    email: decoded.email
                }, process.env.JWT_KEY, {
                    expiresIn: expiresIn
                });

                // Envoi d'un nouveau token dans l'en-tête Authorization
                res.set('Authorization', 'Bearer ' + newToken);

                next(); // Passe au middleware suivant
            }
        });
    } else {
        return res.status(401).json('token_required');
    }
};
