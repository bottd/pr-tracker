import React, { Component } from 'react';
import './App.css';
import RepoForm from '../RepoForm';
import PullContainer from '../PullContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pulls: [],
      loading: false,
      errored: false,
    };
  }

  handleRequest = async (owner, repo) => {
    await this.setState({ loading: true, pulls: [] });
    this.getPulls(owner, repo);
  };

  getPulls = async (owner, repo) => {
    try {
      const response = await fetch(`/api/${owner}/${repo}`);
      const pulls = await response.json();
      this.setState({ loading: false, pulls });
    } catch (error) {
      console.log(error.message);
      this.setState({ errored: true });
    }
  };

  render() {
    return (
      <div className="App">
        <RepoForm handleRequest={this.handleRequest} />
        <PullContainer pulls={this.state.pulls} />
      </div>
    );
  }
}

export default App;
