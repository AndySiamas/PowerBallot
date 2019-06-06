import React from "react";

class BallotNonexistant extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="ballot">
        <h1 className="ballot__header">THIS BALLOT DOES NOT EXIST!</h1>
      </div>
    );
  }
}

export default BallotNonexistant;
