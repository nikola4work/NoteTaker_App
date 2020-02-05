var express = require("express");
var path = require("path");
var fs = require("fs");
var uuidv1 = require("uuid/v1");

var app = express();
var PORT = process.env.port || 1010;

app.use(express.urlencoded.apply({ extended: true }));
app.use(express.json());
app.use(express.static("public"));