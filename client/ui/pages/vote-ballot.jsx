import React from "react";
import BallotReadonlyQuestion from "../questions/ballot-readonly-question.jsx";
import BallotVotableChoice from "../choices/ballot-votable-choice.jsx";
import ReadonlyOption from "../options/readonly-option.jsx";
import PB_Button from "../utilities/pb-button.jsx";
import ShareBallot from "../utilities/share-ballot.jsx";
import BallotNonexistant from "./ballot-nonexistant.jsx";
import DateDisplay from "../utilities/date-display.jsx";
import Axios from 'axios';

class VoteBallot extends React.Component {
  constructor(props) {
    super(props);
    
	this.state = {
	  ballotId: 0,
      question: 'Question',
      choices: {},
      selectedChoices: {},
      multipleAnswersAllowed: false,
      usersCanVoteMultipleTimes: false,
      ballotExists: true,
      ballotCreatedOn: null
    };
  }
  
  componentDidMount() {
  	this.loadBallot();
  }
  
  async loadBallot() {
  	let origin = window.location.origin;
  	let ballotId = window.location.pathname.split('/')[2];
  	let { data } = await Axios.get(`${origin}/ballots/${ballotId}`);
  	
  	let choicesWithNewProps = this.addPropsToChoices(data.choices);
  	let sortedChoices = this.sortChoices(choicesWithNewProps);
  	
  	if (data.ballot != null) {
  		return this.setState({ ballotId: ballotId,
  						question: data.ballot.question,
  						choices:  sortedChoices,
  						multipleAnswersAllowed: data.ballot.multipleAnswersAllowed, 
  						usersCanVoteMultipleTimes: data.ballot.usersCanVoteMultipleTimes,
  						ballotExists: true,
  						ballotCreatedOn: data.ballot.createdAt
  					  });
  	} else {
  		return this.setState({ ballotExists: false });
  	}
  }
  
  addPropsToChoices(choices) {
  	return choices.map((choice) => {
  		return { ...choice,
  				  selected: false };
  	});
  }
  
  sortChoices(choices) {
  	return choices.sort((a, b) => {
  		return a.position - b.position;
  	});
  }
  
  toggleChoice(id, currentlySelected) {
  	var selectedChoices = this.state.multipleAnswersAllowed ? { ...this.state.selectedChoices } : {};
  	
  	if (currentlySelected) {
  		delete selectedChoices[id];
  	} else {
  		selectedChoices[id] = true;
  	}
  	
  	let newChoices = this.state.choices.map((choice) => {
  	    let newState = selectedChoices[choice.id] || false;
  		return { ...choice,
  				  selected: newState }
  	});
  	
  	this.setState({ choices: newChoices, selectedChoices: selectedChoices });
  }
  
  getChoicesAsComponents() {
  	return Object.values(this.state.choices).map((choice) => {
  	  	return <BallotVotableChoice index={choice.id}
  	  						 		key={choice.id} 
  	  						 		text={choice.text} 
  	  						 		toggle={this.toggleChoice.bind(this)} 
  	  						 		selected={choice.selected} />
  		});
  }

  verifyVote() {
  	if (this.state.usersCanVoteMultipleTimes) return true;
  	
    let userDidVote = localStorage.getItem(`ballot ${this.state.ballotId}`) || false;
    if (!userDidVote) {
    	localStorage.setItem(`ballot ${this.state.ballotId}`, true);
    	return true;
    }
    
    return false;
  }

  async submitVote() {
    let selectedChoiceIds = Object.keys(this.state.selectedChoices);
  	if (selectedChoiceIds.length <= 0 || !this.verifyVote()) return false;
  	
  	let data = await Axios.post('/votes', this.state.selectedChoices);
  	if (data.statusText == "OK") this.goToResultsPage();
  	return data;
  }
  
  async goToResultsPage() {
  	window.location.href = `/results/${this.state.ballotId}`;
  }

  render() {
    if (!this.state.ballotExists) {
    	return <BallotNonexistant />
    } else {
    return (
      <div className="ballot">
        <h1 className="ballot__header">Vote on this ballot</h1>
        <div className="ballot__container">
          <BallotReadonlyQuestion text={this.state.question} />
          <div className="ballot__choices-box">
          	{ this.getChoicesAsComponents() }
          </div>
          <div className="ballot-options">
          	<ReadonlyOption text={"Users can vote multiple times"} 
          					selected={this.state.usersCanVoteMultipleTimes}/>
          	<ReadonlyOption text={"Multiple answers allowed"} 
          					selected={this.state.multipleAnswersAllowed}/>
          </div>
          
          <DateDisplay date={this.state.ballotCreatedOn} />
        </div>
        
        <div className="btn-container">
        	<PB_Button text="Submit" onSubmit={this.submitVote.bind(this)} />
        	<PB_Button text="Go to results" onSubmit={this.goToResultsPage.bind(this)} />
        </div>

		<ShareBallot url={window.location.href} />

      </div>
    );
    }
  }
}

export default VoteBallot;
