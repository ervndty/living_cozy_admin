import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BsFillBellFill, 
  BsFillEnvelopeFill, 
  BsPersonCircle, 
  BsSearch, 
  BsJustify
} from 'react-icons/bs';
import '../dist/home.css';

function Header({ OpenSidebar }) {
  const navigate = useNavigate();

  const handlePersonIconClick = () => {
    navigate('/admin/login');
  };

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <BsSearch className='icon' />
      </div>
      <div className='header-right'>
        <BsFillBellFill className='icon' />
        <BsFillEnvelopeFill className='icon' />
        <BsPersonCircle className='icon' onClick={handlePersonIconClick} />
      </div>
    </header>
  );
}

export default Header;
