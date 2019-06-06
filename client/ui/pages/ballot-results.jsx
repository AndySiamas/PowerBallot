import React from "react";
import BallotReadonlyQuestion from "../questions/ballot-readonly-question.jsx";
import BallotReadonlyChoice from "../choices/ballot-readonly-choice.jsx";
import Axios from 'axios';

class BallotResults extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
	  ballotId: 0,
      question: 'Question',
      choices: {},
      updateInterval: 3000
    };
  }
  
  componentDidMount() {
    this.loadBallotFromServer();
    this.setUpdateBallotInterval();
  }
  
  async loadBallotFromServer() {
  	let origin = window.location.origin;
  	let ballotId = window.location.pathname.split('/')[2];
  	let { data } = await Axios.get(`${origin}/ballots/${ballotId}`);
  	
  	let choicesWithPercents = this.getChoicesWithPercentage(data.choices);
  	let sortedChoices = this.sortChoicesByVotes(choicesWithPercents);
  	
  	if (data.ballot != null) {
  		this.setState({ ballotId: ballotId,
  						question: data.ballot.question,
  						choices:  sortedChoices });
  	}
  	
  	return sortedChoices;
  }
  
  getChoicesWithPercentage(choices) {
  	var totalVotes = 0;
  	
  	choices.forEach((choice) => {
  		totalVotes += choice.votes;
  	});
  	
  	let choicesWithPercent = choices.map((choice) => {
  		return { ...choice,
  				 percentage: (choice.votes / totalVotes) || 0 };
  	});
  	
  	return choicesWithPercent;
  }
  
  sortChoicesByVotes(choices) {
  	return choices.sort((a, b) => {
  		return b.votes - a.votes;
  	});
  }
  
  setUpdateBallotInterval() {
  	setInterval(this.loadBallotFromServer.bind(this), this.state.updateInterval);
  }
  
  getChoicesAsComponents() {
  	return Object.values(this.state.choices).map((choice) => {
  	  	return <BallotReadonlyChoice index={choice.id}
  	  						 		 key={choice.id} 
  	  						 		 text={choice.text}
  	  						 		 votes={choice.votes}
  	  						 		 percentage={choice.percentage} />
  		});
  }

  render() {
    return (
      <div className="ballot">
        <h1 className="ballot__header">Vote on this ballot</h1>
        <div className="ballot__container">
          <BallotReadonlyQuestion text={this.state.question} />
          <div className="ballot__choices-box">
          	{ this.getChoicesAsComponents() }
          </div>
        </div>
      </div>
    );
  }
}

export default BallotResults;
