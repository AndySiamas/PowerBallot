import React from "react";
import Icons from '../utilities/icons.jsx';

class BallotReadonlyChoice extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
  	this.setPercentageBarWidth();
  }
  
  getPercentage() {
  	return parseFloat(this.props.percentage) * 100;
  }
  
  setPercentageBarWidth() {
  	let { percentBar } = this.refs;
  	this.refs['percentBar'].style.flex = this.props.percentage;
  }
  
  render() {
    return (
    	<div className="ballot-readonly">
    		<div className="ballot-readonly__tab">
        		{ this.props.text }
        	</div>
        	<div className="ballot-readonly__results-container">
        		<div className="ballot-readonly__percent-bar"
        			 ref="percentBar" />
        	</div>
      	</div>
    );
  }
}

export default BallotReadonlyChoice;
