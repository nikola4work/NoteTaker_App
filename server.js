// required dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");
var uuidv1 = require("uuid/v1");

// localhost set up on 1010 PORT
var app = express();
var PORT = process.env.port || 1010;

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