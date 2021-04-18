import React from 'react';
import './TopMenu.css';

export default function TopMenu({ room }) {
  return (
    <div className='top_menu'>
      <div className='top_menu_title'>
        <h1 className='title'>{room}</h1>
      </div>
    </div>
  );
}
