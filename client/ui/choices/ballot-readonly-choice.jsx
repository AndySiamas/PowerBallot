import React from "react";
import Icons from '../utilities/icons.jsx';

class BallotReadonlyChoice extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
  	this.setPercentageBarWidth();
  }
  
  componentDidUpdate() {
  	this.setPercentageBarWidth();
  }
  
  getPercentage() {
  	return (this.props.percentage * 100).toFixed(2);
  }
  
  getVotes() {
  	let voteText = (this.props.votes === 1) ? 'vote' : 'votes';
  	return this.props.votes + ' ' + voteText;
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
        		<div className="ballot-readonly__percent-bar" ref="percentBar" />
        		<div className="ballot-readonly__text-container">
        			<div className="ballot-readonly__percent-text">
        				{ `${this.getPercentage()}%` }
        			</div>
        			<div className="ballot-readonly__vote-count">
        				{ this.getVotes() }
        			</div>
        		</div>
        	</div>
      	</div>
    );
  }
}

export default BallotReadonlyChoice;
