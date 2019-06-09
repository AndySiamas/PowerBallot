import React from "react";

class BallotReadonlyQuestion extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    let { question } = this.refs;
  	question.style.removeProperty('height');
  }
  
  getErrorIcon() {
  }
  
  render() {
    return (
      <div className="ballot__question">
        <p className="ballot__question-text" ref="question">
        	{ this.props.text }
        </p>
        <div className="line-break" />
      </div>
    );
  }
}

export default BallotReadonlyQuestion;
