import React from "react";

class BallotQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: true
    };
  }
  
  changeText({target}) {
  	this.props.modify(target.value);
  	this.autoExpand(target);
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
          className="ballot__question"
          value={this.props.text}
          onChange={this.changeText.bind(this)}
        />
        <div className="line-break" />
      </React.Fragment>
    );
  }
}

export default BallotQuestion;
