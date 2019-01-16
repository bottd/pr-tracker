import React, { Component } from 'react';
import './RepoForm.css';

class RepoForm extends Component {
  constructor() {
    super();
    this.state = {
      owner: '',
      repo: '',
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { owner, repo } = this.state;
    this.props.handleRequest(owner, repo);
    this.setState({ owner: '', repo: '' });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { owner, repo } = this.state;
    return (
      <form className="RepoForm" onSubmit={this.handleSubmit}>
        <h1 className="RepoForm-title">
          <span className="title-color">PR </span>Tracker
        </h1>
        <p>View open PRs for a GitHub repo</p>
        <input
          name="owner"
          placeholder="Owner"
          onChange={this.handleChange}
          value={owner}
        />
        <input
          name="repo"
          placeholder="Name"
          onChange={this.handleChange}
          value={repo}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default RepoForm;
