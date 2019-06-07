import React from "react";
import PB_Button from "../utilities/pb-button.jsx";

class BallotNonexistant extends React.Component {
  constructor(props) {
    super(props);
  }
  
  goBack() {
  	window.history.back();
  }
  
  render() {
    return (
      <div className="ballot">
        <h1 className="ballot__header">THIS BALLOT DOES NOT EXIST!</h1>
        <PB_Button onSubmit={this.goBack.bind(this)} text="Go back"/>
      </div>
    );
  }
}

export default BallotNonexistant;
