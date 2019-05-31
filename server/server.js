const express = require('express');
const parser = require('body-parser');
const path = require('path');
const app = express();

const ballotHandler = require('./ballotHandler.js');

const PORT = process.env.PORT || 30000;
const PUBLIC_DIR = path.join(__dirname, '/../public');
const INDEX_FILE = path.join(__dirname, '/../public/index.html');

app.use(express.static(PUBLIC_DIR));
app.use('/vote', express.static(PUBLIC_DIR));
app.use('/vote/:id', express.static(PUBLIC_DIR));
app.use('/results', express.static(PUBLIC_DIR));
app.use('/results/:id', express.static(PUBLIC_DIR));
app.use(parser.json());

app.get('/ballots/:id', (req, res) => {
	let { id } = req.params;
	ballotHandler.getBallot(id)
				 .then((ballotInfo) => { res.end(JSON.stringify(ballotInfo)); })
				 .catch((err => { console.log(err); }));
});

app.post('/ballots', (req, res) => {
	ballotHandler.postBallot(req.body)
				 .then((newBallotId) => { res.end(JSON.stringify(newBallotId)); })
				 .catch((err => { console.log(err); }));
});


app.listen(PORT);
console.log(`Listening on port ${PORT}`);