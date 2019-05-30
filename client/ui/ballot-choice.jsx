import React from "react";

class BallotChoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opacityClass: "choice-visible",
      fadeoutTime: 1
    };
  }
  
  changeText({target}) {
  	this.props.modify(this.props.index, target.value);
  	this.autoExpand(target);
  }
  
  autoExpand(target) {
    let computed = window.getComputedStyle(target);
    target.style.height = computed.getPropertyValue("min-height");
    target.style.height = target.scrollHeight + "px";
  }

  fadeOutAndDelete() {
    this.setState({ opacityClass: "choice-fadeout" });
    setTimeout(() => {
      this.props.delete(this.props.index);
    }, this.state.fadeoutTime * 1000);
  }

  render() {
    return (
      <div
        className={`create-ballot__choice-container ${this.state.opacityClass}`}
      >
        <textarea
          className="create-ballot__choice-text"
          placeholder="Option"
          value={this.props.text}
          onChange={this.changeText.bind(this)}
        />
        <div
          className="create-ballot__delete-choice-button"
          onClick={this.fadeOutAndDelete.bind(this)}
        />
      </div>
    );
  }
}

export default BallotChoice;
