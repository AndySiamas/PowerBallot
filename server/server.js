const express = require('express');
const parser = require('body-parser');
const path = require('path');
const app = express();

const ballotHandler = require('./ballotHandler.js');

const PORT = process.env.PORT || 30000;
const PUBLIC_DIR = path.join(__dirname + '/../public');

app.use(express.static(PUBLIC_DIR));
app.use(parser.json());

app.get('/ballots/:id', (req, res) => {
	let { id } = req.params;
	console.log(`Tryna get ${id}`);
	res.end();
});

app.post('/ballots', (req, res) => {
	ballotHandler.postBallot(req.body)
				 .then((newBallotId) => { res.end(JSON.stringify(newBallotId)); })
				 .catch((err => { console.log(err); }));
});


app.listen(PORT);
console.log(`Listening on port ${PORT}`);