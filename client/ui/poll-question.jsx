import React from "react";

class PollQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "Question",
      isValid: true
    };
  }
  
  changeText({target}) {
  	this.setState({ text: target.value });
  	this.autoExpand(target);
  	
  	if (target.value.length <= 0 && this.state.isValid) {
  	  this.props.alertValidity(false, 'question');
  	  this.setState({ isValid: false });
  	} else if (target.value.length > 0 && !this.state.isValid) {
  	  this.props.alertValidity(true, 'question');
  	  this.setState({ isValid: true });
  	}
  }

  autoExpand(target) {
    let computed = window.getComputedStyle(target);
    target.style.height = computed.getPropertyValue("min-height");
    target.style.height = target.scrollHeight + "px";
  }

  render() {
    return (
      <React.Fragment>
        <textarea
          type="text"
          className="create-poll__question"
          value={this.state.text}
          onChange={this.changeText.bind(this)}
        />
        <div className="line-break" />
      </React.Fragment>
    );
  }
}

export default PollQuestion;
