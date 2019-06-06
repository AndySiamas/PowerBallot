import React from "react";
import EditableOption from "./editable-option.jsx";
import Icons from "../utilities/icons.jsx";

class BallotOptions extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="ballot-options">
      
        <div className="ballot-options__add-choice-button-container">
      		<button className="ballot-options__add-choice-button circle-btn"
      				onClick={() => { this.props.addChoice() }}>
          		<svg className="ballot-options__add-choice-icon">
          			<use xlinkHref={Icons.PLUS}></use>
          		</svg> 
        	</button>
        </div>
        
        <EditableOption text="Users can vote multiple times"
        		index="usersCanVoteMultipleTimes" 
        		toggle={this.props.toggleOption}/>
        
        <EditableOption text="Multiple answers allowed"
        		index="multipleAnswersAllowed" 
        		toggle={this.props.toggleOption}/>
        
      </div>
    );
  }
}

export default BallotOptions;
