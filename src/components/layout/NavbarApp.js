import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from './Search';
import { Navbar } from 'react-bootstrap';

const NavbarApp = () => {
  const navStyle = {
    // backgroundImage: 'linear-gradient(to left, #434343 0%, black 100%)'
    backgroundColor: 'black',
  };

  return (
    <Navbar
      expand='lg'
      sticky='top'
      className='navbar-dark flex-nowrap py-0'
      style={navStyle}
    >
      <NavLink to='/'>
        <Navbar.Brand className=' text-light'>
          <img
            src='/favicon.ico'
            width='30'
            height='30'
            className='d-inline-block align-top mx-1'
            alt=''
          />
          <span className='d-none d-lg-inline-block'>KinoFanat</span>
        </Navbar.Brand>
      </NavLink>
      <Search />
      <NavLink
        className='nav-link text-light d-none d-lg-flex align-items-center mx-2 '
        to='/about'
      >
        <h5>
          <i className='fas fa-info-circle text-primary mx-2'></i>
        </h5>
        <h5>About</h5>
      </NavLink>
    </Navbar>
  );
};
export default NavbarApp;
