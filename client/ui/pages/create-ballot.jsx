import React from "react";
import BallotQuestion from "../questions/ballot-editable-question.jsx";
import BallotEditableChoice from "../choices/ballot-editable-choice.jsx";
import BallotOptions from "../options/ballot-options.jsx";
import PB_Button from "../utilities/pb-button.jsx";
import Spinner from "../utilities/spinner.jsx";
import Icons from "../utilities/icons.jsx";
import Axios from 'axios';

class CreateBallot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: 'Question',
      choices: {},
      choiceCount: 0,
      usersCanVoteMultipleTimes: false,
      multipleAnswersAllowed:  false,
      invalidFields: {},
      submitted: false
    };
  }
  
  componentDidMount() {
    this.addDefaultChoices();
  }
  
  async addDefaultChoices() {
  	await this.addChoice();
  	await this.addChoice();
  	await this.addChoice();
  }
  
  async addChoice(text = 'Option') {
    let index = this.state.choiceCount + 1;
  	let newChoices = { ...this.state.choices };
  	newChoices[index] = { index, text, isValid: true };
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
  
  toggleOption(option, newState) {
    if (option === 'usersCanVoteMultipleTimes') {
      this.setState({ usersCanVoteMultipleTimes: newState });
      return;
    }
    
    if (option === 'multipleAnswersAllowed') {
      this.setState({ multipleAnswersAllowed: newState });
      return;
    }
  }
  
  checkFieldValidity(index, newText) {
    let newInvalidFields = null;
    let choices = null;
    
  	if (this.state.invalidFields[index] && newText.length > 0) {
  		newInvalidFields = { ...this.state.invalidFields };
  		delete newInvalidFields[index];
  		
  		if (index != 'question') {
  		    choices = { ...this.state.choices };
  			choices[index].isValid = true;
  		}
  	}
  	
  	else if (!this.state.invalidFields[index] && newText.length <= 0) {
  		newInvalidFields = { ...this.state.invalidFields };
  		newInvalidFields[index] = true;
  		
  		if (index != 'question') {
  			choices = { ...this.state.choices };
  			choices[index].isValid = false;
  		}
  	}
  	
  	if (newInvalidFields) 
  		this.setState({ invalidFields: newInvalidFields });
  		
  	if (choices)
  		this.setState({ choices: choices });
  }
  
  getChoicesAsComponents() {
  	return Object.values(this.state.choices).map((choice) => {
  	  return <BallotEditableChoice index={choice.index}
  	  					   key={choice.index} 
  	  					   text={choice.text}
  	  					   isValid={choice.isValid}
  	  					   modify={this.modifyChoice.bind(this)} 
  	  					   delete={this.deleteChoice.bind(this)} />
  	});
  }
  
  ballotIsValid() {
    let noInvalidFields = (Object.keys(this.state.invalidFields).length == 0);
    let multipleChoices = (Object.keys(this.state.choices).length > 1);
    return noInvalidFields && multipleChoices;
  }
  
  async submitBallot() {
  	if (!this.ballotIsValid() | this.state.submitted) {
  		console.log('BALLOT IS INVALID');
  		return;
  	}
  	
  	this.setState({ submitted: true });
  
  	let ballotInfo = {
  		question: this.state.question,
  		choices: this.state.choices,
  		options: {
  			usersCanVoteMultipleTimes: this.state.usersCanVoteMultipleTimes,
  			multipleAnswersAllowed: this.state.multipleAnswersAllowed
  		}
  	}
  	
  	let postInfo = await Axios.post('/ballots', ballotInfo);
  	
  	if (postInfo.statusText === "OK") {
  		window.location.href = `/vote/${postInfo.data}`;
  	}
  }
  
  render() {
    return (
      <div className="ballot">
        <h1 className="ballot__header">Create your ballot</h1>
        <div className="ballot__container">
        
          <BallotQuestion text={this.state.question} 
          				  modify={this.modifyQuestion.bind(this)} 
          				  isValid={this.state.questionIsValid} />
          				  
          <div className="ballot__choices-box">
          	{ this.getChoicesAsComponents() }
          </div>
          
          <BallotOptions addChoice={this.addChoice.bind(this)} 
          				 toggleOption={this.toggleOption.bind(this)} />
          				 
        </div>
        
        <div className="btn-container">
        	<PB_Button text="Submit" onSubmit={this.submitBallot.bind(this)} />
        	<Spinner active={this.state.submitted} />
        </div>
      </div>
    );
  }
}

export default CreateBallot;
