import React from "react";

class PB_Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
		<button className="main-btn ballot__submit-button"
        		onClick={this.props.onSubmit}>
        		<p className="main-btn__text"> { this.props.text } </p>
        </button>
    );
  }
}

export default PB_Button;
