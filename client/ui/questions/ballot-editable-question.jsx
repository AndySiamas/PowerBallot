import React from "react";
import Icons from "../utilities/icons.jsx";

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
  	
  	if (this.state.isValid && target.value.length <= 0)
  		this.setState({ isValid: false });
  	
  	if (!this.state.isValid && target.value.length > 0)
  		this.setState({ isValid: true });
  }

  autoExpand(target) {
    let computed = window.getComputedStyle(target);
    target.style.height = computed.getPropertyValue("min-height");
    target.style.height = target.scrollHeight + "px";
  }
  
  getErrorIcon() {
  	if (!this.state.isValid) {
  		return (<svg className="ballot__question-error-icon">
      				<use xlinkHref={Icons.DELETE} />
      			</svg> );
  	}
  }

  render() {
    return (
      <div className="ballot__question">
      	<div className="ballot__question-error-container">
      		{ this.getErrorIcon() }
      	</div>
        <textarea
          type="text"
          className="ballot__question-text"
          value={this.props.text}
          onChange={this.changeText.bind(this)}
          ref="question"
        />
        <div className="line-break" />
      </div>
    );
  }
}

export default BallotEditableQuestion;
