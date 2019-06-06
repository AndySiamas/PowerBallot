const db = require('../db/dbController.js');
const { ballot, choice } = require('../db/schemas.js');
const handler = {};

handler.postBallot = async(ballotInfo) => {
	let newBallot = await ballot.create({
		question: ballotInfo.question,
		usersCanVoteMultipleTimes: ballotInfo.options.usersCanVoteMultipleTimes,
		multipleAnswersAllowed: ballotInfo.options.multipleAnswersAllowed
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

handler.incrementChoices = async(choiceIds) => {
	let choices = Object.keys(choiceIds);
	let choicePromises = [];
	
	choices.forEach((id) => {
		choicePromises.push(handler.updateChoice(id));
	});
	
	let completed = await Promise.all(choicePromises);
	return completed;
}

handler.updateChoice = async(id) => {
	let wantedChoice = await choice.findOne({ where: { id: id }});
	let choiceVotes = wantedChoice.dataValues.votes;
	let updated = await wantedChoice.update({ votes: choiceVotes + 1 });
	return updated;
}

handler.getBallot = async(ballotId) => {
	let ballotInfo = {};
	ballotInfo.ballot = await ballot.findOne({ where: { id: ballotId }});	  
	ballotInfo.choices = await choice.findAll({ where: { ballotId: ballotId }});			  
	return ballotInfo;
}

module.exports = handler;