const mongoose = require('mongoose');

// Schema für den Benutzer
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  signup_date: { type: Date, default: Date.now }
});

// Modell erstellen
const User = mongoose.model('User', userSchema);

module.exports = User;
