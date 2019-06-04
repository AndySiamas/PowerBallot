import React from "react";
import Icons from '../utilities/icons.jsx';

class BallotEditableChoice extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    	selected: false
    }
  }
  
  toggleBox() {
    let newState = !this.state.selected;
    this.setState({ selected: newState });
    this.props.toggle(this.props.index, newState);
  }
  
  getCheckmark() {
  	if (this.state.selected) {
  		return (<svg className="ballot__choice-checkbox-icon">
                  <use xlinkHref={Icons.CHECK}></use>
            	</svg>
        );
  	}
  }

  render() {
    return (
      <div className="ballot__choice-container choice-selectable" onClick={this.toggleBox.bind(this)}>
      	<div className="ballot__choice-checkbox">
      		{ this.getCheckmark() }
      	</div>
        <p className="ballot__choice-text choice-not-editable" ref="text">
        	{ this.props.text }
        </p>
      </div>
    );
  }
}

export default BallotEditableChoice;
