import React from "react";

class PB_Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
		<button className="main-btn ballot__submit-button"
        		onClick={this.props.onSubmit} >
        		{ this.props.text }
        </button>
    );
  }
}

export default PB_Button;
