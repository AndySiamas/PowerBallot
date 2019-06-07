import React from "react";
import Moment from 'moment';

class DateDisplay extends React.Component {
  constructor(props) {
    super(props);
  }
  
  getDate() {
  	if (this.props.date) {
  		let dateAsString = Moment(this.props.date).calendar().toLowerCase();
  		return `Posted ${dateAsString}`;
  	}
  }

  render() {
    return (
		<div className="date-display">
			{ this.getDate() } 
        </div>
    );
  }
}

export default DateDisplay;
