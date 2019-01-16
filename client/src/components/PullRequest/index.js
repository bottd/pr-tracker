import React from 'react';
import './PullRequest.css';

export default function PullRequest({ author, author_img, link, number, title, }) {
  return (
    <div className="PullRequest">
      <div
        className="author-img"
        style={{ backgroundImage: `url(${author_img})` }}
      />
      <div className="PullRequest-info">
        <h2 className="PullRequest-header">{`PR #${number}: ${title}`}</h2>
        <p className="author-name">{author}</p>
      </div>
      <a className="pr-link" href={link} />
    </div>
  );
}
