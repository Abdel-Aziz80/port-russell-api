// services/userauth.js

// Fonction pour sauvegarder le token dans le localStorage ou sessionStorage
export const saveToken = (token) => {
  // Choisir entre localStorage ou sessionStorage selon le besoin
  localStorage.setItem('token', token); // ou sessionStorage.setItem('token', token);
};

// Fonction pour récupérer le token depuis localStorage ou sessionStorage
export const getToken = () => {
  return localStorage.getItem('token'); // ou sessionStorage.getItem('token');
};

// Fonction pour supprimer le token du localStorage ou sessionStorage
export const removeToken = () => {
  localStorage.removeItem('token'); // ou sessionStorage.removeItem('token');
};

// Fonction pour vérifier si l'utilisateur est authentifié (token présent dans le stockage)
export const isAuthenticated = () => {
  // Retourne true si un token existe dans localStorage ou sessionStorage
  return !!getToken();
};

// Fonction pour récupérer les informations de l'utilisateur depuis le token JWT (décodé)
export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    // Décoder le token pour extraire les informations utilisateur (par exemple avec jwt-decode)
    const decodedToken = jwt_decode(token);
    return decodedToken.user || null; // Renvoie les informations de l'utilisateur
  } catch (error) {
    console.error('Erreur lors du décodage du token', error);
    return null;
  }
};

// Fonction pour vérifier si le token est expiré
export const isTokenExpired = () => {
  const token = getToken();
  if (!token) return true;

  try {
    const decodedToken = jwt_decode(token);
    const expirationTime = decodedToken.exp * 1000; // Temps d'expiration du token (en millisecondes)
    return Date.now() > expirationTime; // Compare la date actuelle avec la date d'expiration
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'expiration du token', error);
    return true;
  }
};

// Exemple d'utilisation dans le frontend :
// Lorsque l'utilisateur se connecte et que le token est récupéré
export const authenticateUser = (token) => {
  saveToken(token);
  window.location.href = '/dashboard'; // Redirige l'utilisateur vers le tableau de bord
};
