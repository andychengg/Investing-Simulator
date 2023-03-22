import React from 'react';

import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

import './Navbar.css'

const Navbar = () => {
  const items = [
    {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        url: '/',
    },
    {
        label: 'About Us',
        icon: 'pi pi-fw pi-info-circle',
        url: '/about',
    },
    {
    },
  ];
  const loginButton = (
    <Link to="/login" style={{textDecoration:'none'}}>
    <Button
      label='Login'
      icon='pi pi-sign-in'    
      className='p-button-secondary p-ml-auto'
      
    />
    </Link>
  );

  const userMenu = (
    <Menubar model={items} end={loginButton} style={{ color: 'var(--primary-color) '}}/>
  );

  const guestMenu = (
    <Menubar model={items} end={loginButton} style={{ color: 'var(--primary-color)' }}/>
  );

  return (
    <div className='navbar' >
      {guestMenu}
    </div>
  );
}

export default Navbar;
