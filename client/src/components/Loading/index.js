import React from 'react';
import './Loading.css';

export default function Loading(props) {
  return (
    <div className="Loading">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
