import React from "react";
import Option from "./option.jsx";
import Icons from "../utilities/icons.jsx";

class BallotOptions extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="ballot-options">
      
      	<button className="ballot-options__add-choice-button circle-btn"
      			onClick={() => { this.props.addChoice() }}>
          	<svg className="ballot-options__add-choice-icon">
          		<use xlinkHref={Icons.PLUS}></use>
          	</svg> 
        </button>
        
        <Option text="Users can vote multiple times"
        		index="usersCanVoteMultipleTimes" 
        		toggle={this.props.toggleOption}/>
        
        <Option text="Multiple answers allowed"
        		index="multipleAnswersAllowed" 
        		toggle={this.props.toggleOption}/>
        
      </div>
    );
  }
}

export default BallotOptions;
