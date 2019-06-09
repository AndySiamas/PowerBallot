import React from "react";
import Icons from '../utilities/icons.jsx';

class BallotVotableChoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opacityClass: "choice-visible",
      fadeoutTime: 0.5
    };
  }
  
  componentDidMount() {
  	this.autoExpand(this.refs['text']);
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

  getErrorIcon() {
  	if (!this.props.isValid) {
  		return (<svg className="ballot__error-icon">
      				<use xlinkHref={Icons.DELETE} />
      			</svg>
      			);
  	}
  }

  render() {
    return (
      <div className={`ballot__choice-container ${this.state.opacityClass}`}>
      	<div className="ballot__error-container">
      		{ this.getErrorIcon() }
      	</div>
        <textarea
          className="ballot__choice-text"
          placeholder="Option"
          value={this.props.text}
          onChange={this.changeText.bind(this)}
          ref="text"
        />
        <div className="ballot__delete-choice-container">
        	<button
          		className="circle-btn ballot__delete-choice-button"
          		onClick={this.fadeOutAndDelete.bind(this)}>
          			<svg className="ballot__delete-choice-icon">
            			<use xlinkHref={Icons.MINUS}></use>
            		</svg>
        	</button>
        </div>
      </div>
    );
  }
}

export default BallotVotableChoice;
