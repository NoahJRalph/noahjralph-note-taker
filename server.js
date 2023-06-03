// Necessary Declarations
const express = require(`express`);
const path = require(`path`);
const fs = require(`fs`);
const { v4: uuidv4 } = require(`uuid`)
const noteData = JSON.parse(fs.readFileSync(`./db/db.json`, `utf8`));
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`));
// Path setup for proper page loading
app.get(`/`, async (req, res) => {
  res.sendFile(path.join(__dirname, `/public/index.html`));
});
app.get(`/notes`, async (req, res) => {
  res.sendFile(path.join(__dirname, `/public/notes.html`));
});
app.get(`/api/notes`, async (req, res) => {res.json(noteData)});
// New note creation
app.post(`/api/notes`, async (req, res) => {
  let newNote = req.body;
  newNote.id = uuidv4();
  noteData.push(newNote);
  fs.writeFileSync(`./db/db.json`, JSON.stringify(noteData), res.json(newNote));
});
// Note Deletion
app.delete(`/api/notes/:id`, async (req, res) => {
  noteData.forEach(note => {
    if (note.id == req.params.id) {
      noteData.splice(noteData.indexOf(note), 1)
    }
  });
	fs.writeFileSync(`./db/db.json`, JSON.stringify(noteData));
  res.json(noteData);
});
// Listen Server Declaration
app.listen(PORT, () => {
  console.log(`Notes app listening at http://localhost:${PORT}`);
});