import React from 'react';
import './Rank.css';

export default function Rank(props) {
  const { user } = props;
  
  return (
    <div className='rank'>
      <p>{user.name} , your current rank is</p>
      <p>#{user.rank}</p>
    </div>
  )
}
