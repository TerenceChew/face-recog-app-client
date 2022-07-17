import React from 'react';
import './Navigation.css';
import { MdOutlineLogout } from 'react-icons/md';

export default function Navigation(props) {
  const { route, changeRoute, resetSession } = props;

  function handleSignOut() {
    resetSession();
    changeRoute('signOut');
  }

  return (
    <div className='navigation'>
      {route === 'home' && <MdOutlineLogout className='logout-logo' onClick={handleSignOut} />}
    </div>
  )
}
