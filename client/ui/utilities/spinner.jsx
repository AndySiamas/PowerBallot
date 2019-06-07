import React from "react";
import ICONS from "./icons.jsx";

class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }
  
  getSpinner() {
  	if (this.props.active) {
  		return (
  			<svg className="loading-spinner__icon">
          		<use xlinkHref={ICONS.SPINNER}></use>
          	</svg> 
  		);
  	}
  }

  render() {
    return (
		<div className="loading-spinner">
			{ this.getSpinner() }
        </div>
    );
  }
}

export default Spinner;
