import React from "react";
import CreateBallot from "./pages/create-ballot.jsx";
import VoteBallot from "./pages/vote-ballot.jsx";
import BallotResults from "./pages/ballot-results.jsx";

import { BrowserRouter, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "CREATE"
    };
  }

  render() {
    return (
    	<BrowserRouter>
    		<Route exact path='/' component={CreateBallot} />
    		<Route path='/vote/' component={VoteBallot} />
    		<Route path='/results/*' component={BallotResults} />
    	</BrowserRouter>
    );
  }
}

export default App;
