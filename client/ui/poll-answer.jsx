import React from "react";

class PollAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
	  text: "Option",
	  isValid: true,
      opacityClass: "answer-visible",
      fadeoutTime: 1
    };
  }
  
  componentDidMount() {
    this.setState({ text: this.props.defaultText });
  }
  
  changeText({target}) {
  	this.setState({ text: target.value });
  	this.autoExpand(target);
  	
  	if (target.value.length <= 0 && this.state.isValid) {
  	  this.props.alertValidity(false, this.props.index);
  	  this.setState({ isValid: false });
  	} else if (target.value.length > 0 && !this.state.isValid) {
  	  this.props.alertValidity(true, this.props.index);
  	  this.setState({ isValid: true });
  	}
  }
  
  autoExpand(target) {
    let computed = window.getComputedStyle(target);
    target.style.height = computed.getPropertyValue("min-height");
    target.style.height = target.scrollHeight + "px";
  }

  fadeOutAndDelete() {
    this.setState({ opacityClass: "answer-fadeout" });
    setTimeout(() => {
      this.props.delete(this.props.index);
    }, this.state.fadeoutTime * 1000);
  }

  render() {
    return (
      <div
        className={`create-poll__answer-container ${this.state.opacityClass}`}
      >
        <textarea
          className="create-poll__answer-text"
          value={this.state.text}
          onChange={this.changeText.bind(this)}
        />
        <div
          className="create-poll__delete-answer-button"
          onClick={this.fadeOutAndDelete.bind(this)}
        />
      </div>
    );
  }
}

export default PollAnswer;
