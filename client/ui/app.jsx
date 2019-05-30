import React from "react";
import CreateBallot from "./create-ballot.jsx";
import LoadBallot from "./load-ballot.jsx";

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
        return <CreateBallot switchPage={this.switchPage.bind(this)} />;
      case "LOAD":
        return <LoadBallot switchPage={this.switchPage.bind(this)} />;
    }
  }

  render() {
    return this.getPage();
  }
}

export default App;
