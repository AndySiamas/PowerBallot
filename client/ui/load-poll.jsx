import React from "react";

class LoadPoll extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="load-poll">
        <h2 className="load-poll__heading">Loading</h2>
      </div>
    );
  }
}

export default LoadPoll;
