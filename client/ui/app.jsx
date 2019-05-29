import React from "react";
import CreatePoll from "./create-poll.jsx";
import LoadPoll from "./load-poll.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "CREATE"
    };
  }

  switchPage(newPage) {
    this.setState({ page: newPage });
  }

  getPage() {
    switch (this.state.page) {
      case "CREATE":
        return <CreatePoll switchPage={this.switchPage.bind(this)} />;
      case "LOAD":
        return <LoadPoll switchPage={this.switchPage.bind(this)} />;
    }
  }

  render() {
    return this.getPage();
  }
}

export default App;
