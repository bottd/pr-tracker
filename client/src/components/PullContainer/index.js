import React from 'react';
import './PullContainer.css';
import PullRequest from '../PullRequest';

export default function PullsContainer(props) {
  const pulls = props.pulls.map(pull => (
    <PullRequest {...pull} key={pull.id} />
  ));
  return <div className="PullContainer">{pulls}</div>;
}
