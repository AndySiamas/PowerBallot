import React from "react";
import PollQuestion from "./poll-question.jsx";
import PollAnswer from "./poll-answer.jsx";

class CreatePoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "Question",
      answers: {},
      answerCount: 0,
      invalidFields: {}
    };
  }

  componentDidMount() {
    this.addDefaultAnswers(3);
  }

  async addDefaultAnswers(amount) {
    for (let i = 0; i < amount; i++) {
      await this.addAnswer(`Option ${i}`);
    }
  }

  async addAnswer(text = 'Option') {
    let answers = { ...this.state.answers };
    let index = this.state.answerCount + 1;
    let newAnswer = this.createAnswer(text, index);
    answers[index] = newAnswer;
    await this.setState({ answers: answers, answerCount: index });
  }

  async deleteAnswer(index) {
    let answers = { ...this.state.answers };
    delete answers[index];
    await this.setState({ answers: answers });
  }

  createAnswer(text, index) {
    return (
      <PollAnswer
        defaultText={text}
        index={index}
        key={`${text} ${index}`}
        alertValidity={this.alertValidity.bind(this)}
        delete={this.deleteAnswer.bind(this)}
      />
    );
  }

  getAnswers() {
    return Object.values(this.state.answers);
  }

  submitPoll() {
  	if (this.verifyQuestionAndAnswers()) {
  	  console.log('Submitting!');
  	} else {
  	  console.log('Unable to submit!');
  	}
  }
  
  verifyQuestionAndAnswers() {
  	return Object.keys(this.state.invalidFields).length <= 0;
  }

  alertValidity(isValid, index) {
    let invalidFields = { ...this.state.invalidFields };
    if (!isValid) invalidFields[index] = true;
    if (isValid && invalidFields[index]) delete invalidFields[index];
    this.setState({ invalidFields: invalidFields });
  }

  render() {
    return (
      <div className="create-poll">
        <h1 className="create-poll__header">Create your ballot</h1>
        <div className="create-poll__container">
          <PollQuestion alertValidity={this.alertValidity.bind(this)} />
          <div className="create-poll__answers-box">{ this.getAnswers() }</div>
          <button
            className="create-poll__add-answer-button"
            onClick={() => { this.addAnswer(`Option ${this.state.answerCount}`) }} > 
            + 
          </button>
        </div>
        <button
          className="btn create-poll__submit-button"
          onClick={this.submitPoll.bind(this)}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default CreatePoll;
