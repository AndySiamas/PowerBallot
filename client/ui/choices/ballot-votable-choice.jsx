import React from "react";
import Icons from '../utilities/icons.jsx';

class BallotVotableChoice extends React.Component {
  constructor(props) {
    super(props);
  }
  
  toggleBox() {
    this.props.toggle(this.props.index, this.props.selected);
  }
  
  getCheckmark() {
  	if (this.props.selected) {
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

export default BallotVotableChoice;
