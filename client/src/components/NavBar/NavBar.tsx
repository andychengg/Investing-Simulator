import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import 'components/css/Navbar.css'

function Navbar() {
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
        label: 'Contact',
        icon: 'pi pi-fw pi-envelope',
        url: '/contact',
    },
  ];
  const loginButton = (
    <Button
      label='Login'
      icon='pi pi-sign-in'    
      className='p-button-secondary p-ml-auto'
    />
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
