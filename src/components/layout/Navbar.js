import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Search from './Search';
import { MovieContext } from '../context/MovieContext';

const Navbar = () => {
  const navStyle = {
    backgroundImage: 'linear-gradient(to left, #434343 0%, black 100%)'
  };

  const { resetHome, lang } = useContext(MovieContext);

  return (
    <nav
      style={navStyle}
      className='navbar sticky-top navbar-dark flex justify-content-lg-between p-0'
      id='navbar'
    >
      <NavLink to='/'>
        <div
          className='navbar-brand align-items-center ml-5'
          href='#'
          onClick={resetHome}
        >
          KinoFanat
        </div>
      </NavLink>
      <Search />
      <ul className='nav justify-content-end mr-lg-5'>
        <li className='nav-item' onClick={resetHome}>
          <NavLink className='nav-link text-light' to='/'>
            <i className='fas fa-home'></i>
            <p>{lang === 'en-US' ? 'Home' : 'Главная'}</p>
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link text-light' to='/about'>
            <i className='fas fa-heart'></i>
            <p>{lang === 'en-US' ? 'About' : 'О нас'}</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
