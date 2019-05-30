import React from "react";
import BallotQuestion from "./ballot-question.jsx";
import BallotChoice from "./ballot-choice.jsx";
import axios from 'axios';

class VoteBallot extends React.Component {
  constructor(props) {
    super(props);
    
	this.state = {
      question: 'Question',
      choices: {},
      options: {}
    };
  }
  
  componentDidMount() {
  	this.loadBallot();
  }
  
  loadBallot() {
  	let ballotId = window.location.pathname;
  	console.log(ballotId);
  }
  
  
  
  getChoicesAsComponents() {
  	return Object.values(this.state.choices).map((choice) => {
  	  	return <BallotChoice index={choice.index}
  	  						 key={choice.index} 
  	  						 text={choice.text}
  	  					     modify={this.modifyChoice.bind(this)} 
  	  					     delete={this.deleteChoice.bind(this)}/>
  		});
  }

  render() {
    return (
      <div className="ballot">
        <h1 className="ballot__header">Vote on this ballot</h1>
        <div className="ballot__container">
          <BallotQuestion text={this.state.question} />
          <div className="ballot__choices-box">
          	{ this.getChoicesAsComponents() }
          </div>
          <button className="circle-btn ballot__add-choice-button" /> 
        </div>
      </div>
    );
  }
}

export default VoteBallot;
