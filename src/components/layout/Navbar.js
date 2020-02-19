import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from './Search';

const Navbar = () => {
  const navStyle = {
    backgroundColor: '#071e3d'
  };

  return (
    <nav
      style={navStyle}
      className='navbar navbar-expand-lg navbar-dark flex justify-content-lg-between'
    >
      <NavLink to='/'>
        <div className='navbar-brand align-items-center' href='#'>
          KinoFanat
        </div>
      </NavLink>
      <Search />
      <ul className='nav justify-content-end '>
        <li className='nav-item'>
          <NavLink className='nav-link text-light' to='/'>
            Home
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link text-light' to='/about'>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
