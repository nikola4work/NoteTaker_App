// required dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");
var uuidv1 = require("uuidv1");

// localhost set up on 1010 PORT
var app = express();
var PORT = process.env.PORT || 1010;

app.use(express.urlencoded.apply({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// route for notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// API
app.get("/api/notes", function(req, res) {
    var jsonContent = getNoteJSON();
    return res.json(jsonContent);
});

// return landing page
app.get("/", function(res, req) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Create New Note a new note using fs and JSON
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.id = uuidv1();
    console.log(newNote);
    var noteJson = getNoteJSON();
    noteJson.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, "db", "db.json"),
        JSON.stringify(noteJson)
    );
    res.json(noteJson);
});

// Delete a note based on the id
app.delete("/api/notes/:id", function(req, res) {
    var jsonContent = getNoteJSON();
    var updatedJSON = jsonContent.filter(function(data) {
        return data.id != req.params.id;
    });
    fs.writeFileSync(
        path.join(__dirname, "db", "db.json"),
        JSON.stringify(updatedJSON)
    );
    res.json(updatedJSON);
});

function getNoteJSON() {
    var content = fs.readFileSync(path.join(__dirname, "db", "db.json"));
    return JSON.parse(content);
}

// server listen on PORT 1010
app.listen(PORT, function() {
    console.log("Active on PORT " + PORT);
});