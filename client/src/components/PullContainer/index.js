import React from 'react';
import './PullContainer.css';
import PullRequest from '../PullRequest';

export default function PullsContainer(props) {
  const pulls = props.pulls.map(pull => (
    <PullRequest {...pull} key={pull.id} />
  ));
  if (!pulls.length) {
    return (
      <div className="PullContainer">
        <h2>
          There's nothing here! The selected repository may not exist, or have
          no open pull requests.
        </h2>
      </div>
    );
  }
  return <div className="PullContainer">{pulls}</div>;
}
