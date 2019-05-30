import React from "react";
import BallotQuestion from "./ballot-question.jsx";
import BallotChoice from "./ballot-choice.jsx";
import axios from 'axios';

class CreateBallot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: 'Question',
      choices: {},
      choiceCount: 0,
      options: {},
      invalidFields: {},
      submitted: false
    };
  }
  
  componentDidMount() {
    this.addDefaultChoices();
  }
  
  async addDefaultChoices() {
  	await this.addChoice('Option 1');
  	await this.addChoice('Option 2');
  	await this.addChoice('Option 3');
  }
  
  async addChoice(text) {
    let index = this.state.choiceCount + 1;
  	let newChoices = { ...this.state.choices };
  	newChoices[index] = { index, text };
  	return this.setState({ choices : newChoices, choiceCount: index }); 
  }
  
  async deleteChoice(index) {
    let newChoices = { ...this.state.choices };
    delete newChoices[index];
    return this.setState({ choices : newChoices }); 
  }
  
  async modifyChoice(index, newText) { 
  	let modifiedChoices = { ...this.state.choices };
  	modifiedChoices[index]['text'] = newText;
  	this.checkFieldValidity(index, newText);
  	return this.setState({ choices: modifiedChoices });
  }
  
  async modifyQuestion(newText) {
  	this.checkFieldValidity('question', newText);
  	return this.setState({ question: newText });
  }
  
  checkFieldValidity(index, newText) {
    let newInvalidFields = null;
    
  	if (this.state.invalidFields[index] && newText.length > 0) {
  		newInvalidFields = { ...this.state.invalidFields };
  		delete newInvalidFields[index];
  		console.log(`field ${index} is now valid`);
  	}
  	else if (!this.state.invalidFields[index] && newText.length <= 0) {
  		newInvalidFields = { ...this.state.invalidFields };
  		newInvalidFields[index] = true;
  		console.log(`field ${index} is NOT VALID`);
  	}
  	
  	if (newInvalidFields) this.setState({ invalidFields: newInvalidFields });
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
  
  ballotIsValid() {
    return Object.keys(this.state.invalidFields).length == 0;
  }  
  
  async submitBallot() {
  	if (!this.ballotIsValid || this.state.submitted) {
  		console.log('BALLOT IS INVALID');
  		return;
  	}
  	
  	this.setState({ submitted: true });
  
  	let ballotInfo = {
  		question: this.state.question,
  		choices: this.state.choices,
  		options: this.state.options
  	}
  	
  	let postInfo = await axios.post('/ballots', ballotInfo);
  	
  	if (postInfo.statusText === "OK")
  		console.log(postInfo.data);
  }
  
  render() {
    return (
      <div className="create-ballot">
        <h1 className="create-ballot__header">Create your ballot</h1>
        <div className="create-ballot__container">
          <BallotQuestion text={this.state.question} 
          				  modify={this.modifyQuestion.bind(this)}/>
          <div className="create-ballot__choices-box">
          	{ this.getChoicesAsComponents() }
          </div>
          <button className="create-ballot__add-choice-button" /> 
        </div>
        <button className="btn create-ballot__submit-button"
        		onClick={this.submitBallot.bind(this)}> 
        		Submit 
        </button>
      </div>
    );
  }
}

export default CreateBallot;
