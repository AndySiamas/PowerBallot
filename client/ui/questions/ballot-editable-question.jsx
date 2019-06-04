import React from "react";

class BallotEditableQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: true
    };
  }
  
  componentDidMount() {
  	this.autoExpand(this.refs['question']);	// set default height on load
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
          ref="question"
        />
        <div className="line-break" />
      </React.Fragment>
    );
  }
}

export default BallotEditableQuestion;
