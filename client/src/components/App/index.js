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
    await this.setState({ loading: true });
    this.getPulls(owner, repo);
  };

  getPulls = async (owner, repo) => {
    const storedData = JSON.parse(localStorage.getItem(`${owner}/${repo}`));
    if (storedData) {
      return this.setState({ pulls: storedData, loading: false });
    }
    try {
      const response = await fetch(`/api/${owner}/${repo}`);
      const pulls = await response.json();
      localStorage.setItem(`${owner}/${repo}`, JSON.stringify(pulls));
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
