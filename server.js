const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Hier importierst du die Routen

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());  // Für JSON-Daten
app.use(cors());          // Ermöglicht CORS

// Verbindung zur MongoDB Atlas-Datenbank
const dbURI = 'mongodb+srv://Joshua:12345@usercontrolsystem.y77gi2p.mongodb.net/?retryWrites=true&w=majority&appName=UserControlSystem';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB verbunden'))
  .catch((err) => console.log('Datenbankfehler: ', err));

// Verwende den Präfix '/api/users' für alle Routen in userRoutes
app.use('/api/users', userRoutes);

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});



