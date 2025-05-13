// controllers/catways.js
const Catway = require('../models/catway');

exports.getAll = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ error: 'Catway non trouvé' });
    res.json(catway);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.add = async (req, res) => {
  try {
    const newCatway = new Catway(req.body);
    await newCatway.save();
    res.status(201).json(newCatway);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout' });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCatway) return res.status(404).json({ error: 'Catway non trouvé' });
    res.json(updatedCatway);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedCatway = await Catway.findByIdAndDelete(req.params.id);
    if (!deletedCatway) return res.status(404).json({ error: 'Catway non trouvé' });
    res.json({ message: 'Catway supprimé' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};
