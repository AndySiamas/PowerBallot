import React from "react";
import Icons from "../utilities/icons.jsx";

class ReadonlyOption extends React.Component {
  constructor(props) {
    super(props);
  }
  
  getCheckmark() {
    let icon = this.props.selected ? Icons.CHECK : Icons.DELETE;
  	return (<svg className="ballot-options__readonly-option-checkbox-icon">
              <use xlinkHref={icon}></use>
            </svg>
    );
  }
  
  render() {
    return (
      <div className="ballot-options__readonly-option">
      	<div className="ballot-options__readonly-option-checkbox">
      		{ this.getCheckmark() }
      	</div>
        <p className="ballot-options__readonly-option-text"> { this.props.text } </p>
      </div>
    );
  }
}

export default ReadonlyOption;
