const { ballot, choice } = require('./schemas');

exports.createBallot = (ballotInfo) => {
	return new Promise((resolve, reject) => {
		if (ballotInfo) {
			ballot.create({
				question: ballotInfo.question,
				multipleChoices: ballotInfo.multipleChoices
			})
			.then((newBallot) => {
				resolve(newBallot);
			});
		} else {
			reject('ERROR: INCORRECT BALLOT PROPERTIES');
		}
	});
}

exports.createChoice = (choiceInfo) => {
	return new Promise((resolve, reject) => {
		if (choiceInfo) {
			choice.create({
				ballotId: choiceInfo.ballotId,
				text: choiceInfo.text,
				votes: 0
			})
			.then((newChoice) => {
				resolve(newChoice);
			});
		} else {
			reject('ERROR: INCORRECT CHOICE PROPERTIES');
		}
	});
}