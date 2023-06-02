// Necessary Declarations
const express = require('express');
const path = require('path');
const fs = require(`fs`);
const noteData = require('./db/db.json');
const PORT = 3001;
const app = express();
// Express Usage
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// Get Requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, `public`, 'index.html'));
});
app.get(`/notes`, (req, res) => {
  res.sendFile(path.join(__dirname, `public`, `notes.html`));
});
app.get('/api/notes', async (req, res) => res.json(JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))));
// Post Requests
app.post(`/api/notes`, async (req, res) => {
  // Make regex ID
  console.log(req.body);
  // Check if ID is clone
  // Add ID to post in json
  res.json(noteData);
});
// Listen Server Declaration
app.listen(PORT, () => {
  console.log(`Notes app listening at http://localhost:${PORT}`);
});
