import React from "react";
import BallotReadonlyQuestion from "../questions/ballot-readonly-question.jsx";
import BallotVotableChoice from "../choices/ballot-votable-choice.jsx";
import Axios from 'axios';

class BallotResults extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
	  ballotId: 0,
      question: 'Question',
      choices: {}
    };
  }
  
  componentDidMount() {
    this.loadBallotFromServer();
  }
  
  async loadBallotFromSessionStorage() {
  	let ballotId = window.location.pathname.split('/')[2];
  	let newState = JSON.parse(sessionStorage.getItem(`${ballotId}`));
  	
  	if (newState) {
  		this.setState({ ballotId: newState.ballotId,
  					    question: newState.question,
  					    choices: newState.choices });
  	} else {
  		this.loadBallotFromServer();
  	}
  }
  
  async loadBallotFromServer() {
  	let origin = window.location.origin;
  	let ballotId = window.location.pathname.split('/')[2];
  	let { data } = await Axios.get(`${origin}/ballots/${ballotId}`);
  	
  	if (data.ballot != null) {
  		this.setState({ ballotId: ballotId,
  						question: data.ballot.question,
  						choices:  this.sortChoices(data.choices) });
  	}
  }
  
  sortChoices(choices) {
  	return choices.sort((a, b) => {
  		return a.position - b.position;
  	});
  }
  
  toggleChoice(id, selected) {
  	let selectedChoices = { ...this.state.selectedChoices };
  	if (selected) {
  		selectedChoices[id] = true;
  	} else {
  		delete selectedChoices[id];
  	}
  	this.setState({ selectedChoices: selectedChoices });
  }
  
  getChoicesAsComponents() {
  	return Object.values(this.state.choices).map((choice) => {
  	  	return <BallotVotableChoice index={choice.id}
  	  						 		key={choice.id} 
  	  						 		text={choice.text} 
  	  						 		toggle={this.toggleChoice.bind(this)}/>
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
