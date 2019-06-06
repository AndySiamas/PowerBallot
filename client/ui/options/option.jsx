import React from "react";
import Icons from "../utilities/icons.jsx";

class Option extends React.Component {
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
  		return (<svg className="ballot-options__option-checkbox-icon">
                  <use xlinkHref={Icons.CHECK}></use>
            	</svg>
        );
  	}
  }
  
  render() {
    return (
      <div className="ballot-options__option">
      	<div className="ballot-options__option-checkbox"
      		 onClick={this.toggleBox.bind(this)}>
      		{ this.getCheckmark() }
      	</div>
        <p className="ballot-options__option-text"> { this.props.text } </p>
      </div>
    );
  }
}

export default Option;
