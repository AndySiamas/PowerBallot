import React from "react";

class BallotReadonlyQuestion extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    let { question } = this.refs;
  	question.style.removeProperty('height');
  }
  
  render() {
    return (
      <React.Fragment>
        <p className="ballot__question" ref="question">
        	{ this.props.text }
        </p>
        <div className="line-break" />
      </React.Fragment>
    );
  }
}

export default BallotReadonlyQuestion;
