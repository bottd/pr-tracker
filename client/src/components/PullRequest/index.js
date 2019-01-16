import React from 'react';
import './PullRequest.css';

export default function PullRequest(props) {
  const {
    author,
    author_img,
    comment_count,
    commit_count,
    link,
    number,
    title,
  } = props;

  return (
    <div className="PullRequest">
      <div
        className="author-img"
        style={{ backgroundImage: `url(${author_img})` }}
      />
      <div className="PullRequest-info">
        <h2 className="PullRequest-header">{`PR #${number}: ${title}`}</h2>
        <div className="PullRequest-stats">
          <p className="author-name">{author}</p>
          <p className="stats">
            <i className="fas fa-comment-alt" />
            {` ${comment_count || 0} `}
            <i className="fas fa-keyboard" />
            {` ${commit_count || 0}`}
          </p>
        </div>
      </div>
      <a className="pr-link" href={link} />
    </div>
  );
}
