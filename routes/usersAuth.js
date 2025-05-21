// routes/usersAuth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route réelle d'authentification
router.post('/authenticate', (req, res) => {
  const { username, password } = req.body;

  if (username === 'Mouloud' && password === '1234Password') {
    const token = jwt.sign(
      { user: { username } },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Identifiants invalides' });
});

// Alias pour ceux qui envoient vers /login au lieu de /users/authenticate
router.post('/login', (req, res) => {
  res.redirect(307, '/users/authenticate');
});

module.exports = router;
