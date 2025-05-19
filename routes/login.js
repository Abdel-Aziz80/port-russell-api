// routes/login.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /login
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Identifiants de test
  if (username === 'Mouloud' && password === '1234Password') {
    const token = jwt.sign(
      { user: { username } },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
