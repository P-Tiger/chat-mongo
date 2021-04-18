import React from 'react';

import './TextContainer.css';

// import OnlineIcon from '../../Icons/onlineIcon.png'

const TextContainer = ({ users }) => (
  <div className='textContainer'>
    <div className='Top_Title'>
      <div className='Top_wrapper_Title'>
        <h1 className='title'>People currently chatting</h1>
      </div>
    </div>
    {users ? (
      <div className='activeContainer'>
        <ul>
          {users.map(({ name }) => (
            <li key={name} className='activeItem'>
              <img alt='Online Icon' src={''} />
              {name}
            </li>
          ))}
        </ul>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
