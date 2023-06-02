// Necessary Declarations
const express = require(`express`);
const path = require(`path`);
const fs = require(`fs`);
const uuid = require(`uuid`);
const noteData = JSON.parse(fs.readFileSync(`./db/db.json`, `utf8`));
const PORT = process.env.PORT || 3001;
const app = express();
// Express Usage
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`));
// Get Requests
app.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, `/public/index.html`));
});
app.get(`/notes`, (req, res) => {
  res.sendFile(path.join(__dirname, `/public/notes.html`));
});
app.get(`/api/notes`, async (req, res) => {res.json(noteData)});
// Post Requests
app.post(`/api/notes`, async (req, res) => {
  let newNote = req.body;
  newNote.id = uuid.v4;
  noteData.push(newNote);
  fs.writeFileSync(`./db/db.json`, JSON.stringify(noteData), res.json(newNote));
});
// Listen Server Declaration
app.listen(PORT, () => {
  console.log(`Notes app listening at http://localhost:${PORT}`);
});