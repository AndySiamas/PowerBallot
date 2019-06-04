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
      totalVotes: 0
    };
  }
  
  componentDidMount() {
    this.loadBallotFromSessionStorage();
  }
  
  async loadBallotFromSessionStorage() {
  	let ballotId = window.location.pathname.split('/')[2];
  	let storedBallotInfo = JSON.parse(sessionStorage.getItem(`${ballotId}`));
  	
  	if (!storedBallotInfo) {
  		this.loadBallotFromServer();
  		return;
  	}
  	
  	let updatedChoices = this.getChoicesWithPercentage(storedBallotInfo.choices);
  	
  	this.setState({ ballotId: storedBallotInfo.ballotId,
  					question: storedBallotInfo.question,
  					choices:  updatedChoices });
  }
  
  async loadBallotFromServer() {
  	let origin = window.location.origin;
  	let ballotId = window.location.pathname.split('/')[2];
  	let { data } = await Axios.get(`${origin}/ballots/${ballotId}`);
  	let choicesWithPercents = this.getChoicesWithPercentage(data.choices);
  	
  	if (data.ballot != null) {
  		this.setState({ ballotId: ballotId,
  						question: data.ballot.question,
  						choices:  choicesWithPercents });
  	}
  }
  
  getChoicesWithPercentage(choices) {
  	var totalVotes = 0;
  	
  	choices.forEach((choice) => {
  		totalVotes += choice.votes;
  	});
  	
  	let newChoices = choices.map((choice) => {
  		return { ...choice,
  				 percentage: (choice.votes / totalVotes).toFixed(3) };
  	});
  	
  	return newChoices;
  }
  
  sortChoices(choices) {
  	return choices.sort((a, b) => {
  		return a.position - b.position;
  	});
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
