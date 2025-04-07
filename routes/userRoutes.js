const express = require('express');
const User = require('../models/user');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// Alle Benutzer abrufen
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Einen Benutzer erstellen
router.post('/', async (req, res) => {
  const { name, email, role } = req.body;

  const newUser = new User({ name, email, role });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Einen Benutzer nach ID abrufen
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Benutzer aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Benutzer löschen
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/', 
    [
      // Validierung der Eingabefelder
      body('name').isLength({ min: 3 }).withMessage('Name muss mindestens 3 Zeichen lang sein'),
      body('email').isEmail().withMessage('Bitte eine gültige E-Mail-Adresse angeben'),
      body('role').isIn(['admin', 'user']).withMessage('Rolle muss entweder "admin" oder "user" sein')
    ], 
    async (req, res) => {
      // Überprüfen, ob Fehler bei der Validierung vorliegen
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });  // Fehler zurückgeben
      }
  
      // Wenn keine Fehler vorliegen, die Eingabedaten extrahieren
      const { name, email, role } = req.body;
  
      const newUser = new User({ name, email, role });
  
      try {
        // Benutzer speichern
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);  // Erfolgreich zurückgeben
      } catch (err) {
        res.status(400).json({ message: err.message });  // Fehler bei Speicherung
      }
    }
  );
  
module.exports = router;
