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
      className='navbar sticky-top navbar-dark flex justify-content-lg-between'
    >
      <NavLink to='/'>
        <div
          className='navbar-brand align-items-center'
          href='#'
          onClick={resetHome}
        >
          KinoFanat
        </div>
      </NavLink>
      <Search />
      <ul className='nav justify-content-end '>
        <li className='nav-item' onClick={resetHome}>
          <NavLink className='nav-link text-light' to='/'>
            {lang === 'en-US' ? 'Home' : 'Главная'}
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link text-light' to='/about'>
            {lang === 'en-US' ? 'About' : 'О нас'}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
