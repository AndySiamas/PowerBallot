import React from "react";

class BallotEditableQuestion extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <React.Fragment>
        <p className="ballot__question">
        	{ this.props.text }
        </p>
        <div className="line-break" />
      </React.Fragment>
    );
  }
}

export default BallotEditableQuestion;
