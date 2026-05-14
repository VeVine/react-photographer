import React from 'react';
import { Link } from 'react-router-dom';
import Gallery from '../components/Gallery/Gallery';
import Reviews from '../components/Reviews/Reviews';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Профессиональная фотосъемка</h1>
          <p>Поймаем ваши лучшие моменты вместе</p>
        </div>
      </section>
      
      <Gallery />
      
      <Reviews />

      <section className="cta-section">
        <h2>Готовы запечатлеть ваши моменты?</h2>
        <Link to="/booking" className="cta-button">Забронировать фотосессию</Link>
      </section>
    </div>
  );
};

export default Home;