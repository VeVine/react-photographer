import React from 'react';
import { FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram /> Instagram
        </a>
      </div>
      
      <div className="contact-info">
        <p><FaPhone /> +7 (999) 123-45-67</p>
        <p><FaEnvelope /> photo@example.com</p>
      </div>
      
      <div className="copyright">
        &copy; {new Date().getFullYear()} Фотограф. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;