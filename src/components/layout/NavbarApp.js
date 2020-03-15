import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Search from './Search';
import { MovieContext } from '../context/MovieContext';
import { Navbar } from 'react-bootstrap';

const NavbarApp = () => {
  const navStyle = {
    // backgroundImage: 'linear-gradient(to left, #434343 0%, black 100%)'
    backgroundColor: 'black'
  };

  const { resetHome, lang } = useContext(MovieContext);

  return (
    <Navbar
      expand='lg'
      sticky='top'
      className='navbar-dark py-0'
      style={navStyle}
    >
      <NavLink to='/'>
        <Navbar.Brand onClick={resetHome} className=' text-light'>
          <img
            src='/favicon.ico'
            width='30'
            height='30'
            className='d-inline-block align-top mx-1'
            alt=''
          />
          KinoFanat
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls='basic-navbar-nav' className='my-1' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Search />
        <ul className='nav flex-nowrap justify-content-center'>
          <li className='nav-item' onClick={resetHome}>
            <NavLink className='nav-link text-light' to='/'>
              <i className='fas fa-home text-primary mx-1'></i>
              {lang === 'en-US' ? 'Home' : 'Главная'}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link text-light' to='/about'>
              <i className='fas fa-heart text-danger mx-1'></i>
              {lang === 'en-US' ? 'Favourites' : 'Избраное'}
            </NavLink>
          </li>
        </ul>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavbarApp;
