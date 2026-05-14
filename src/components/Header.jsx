import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Фотограф</div>
      <nav>
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/portfolio">Портфолио</Link></li>
          <li><Link to="/about">Обо мне</Link></li>
          <li><Link to="/booking">Забронировать</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;