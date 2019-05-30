const db = require('../db/dbController.js');
const { ballot, choice } = require('../db/schemas.js');

const handler = {};

handler.postBallot = async(ballotInfo) => {
	let newBallot = await ballot.create({
		question: ballotInfo.question,
		multipleChoices: true
	});
	
	let ballotId = newBallot.get('id');
	let choices = Object.values(ballotInfo.choices);
	let choicePromises = [];
	choices.forEach((choice) => {
		choicePromises.push(
			handler.postChoice({
				ballotId,
				text: choice.text,
				position: choice.index
			})
		)
	});
	
	let postedChoices = await Promise.all(choicePromises);
	return ballotId;
}

handler.postChoice = async(choiceInfo) => {
	return choice.create({
		ballotId: choiceInfo.ballotId,
		text: choiceInfo.text,
		position: choiceInfo.position,
		votes: 0
	});
}

module.exports = handler;