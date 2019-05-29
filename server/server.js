const express = require('express');
const parser = require('body-parser');
const path = require('path');
const app = express();

const db = require('../db/dbController.js');
const schemas = require('../db/schemas.js');

const PORT = process.env.PORT || 30000;
const PUBLIC_DIR = path.join(__dirname + '/../public');

app.use(express.static(PUBLIC_DIR));
app.use(parser.json());

app.post('/ballots', (req, res) => {
	console.log(req.body);
	res.end();
});


app.listen(PORT);
console.log(`Listening on port ${PORT}`);