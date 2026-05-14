import React, { useState } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import reviews from '../../data/reviews';
import './reviews.css';

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState('all');

  // Фильтрация отзывов по категории
  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.category === filter);

  // Получение уникальных категорий для фильтра
  const categories = ['all', ...new Set(reviews.map(review => review.category))];

  // Функции для навигации
  const nextReview = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === filteredReviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredReviews.length - 1 : prevIndex - 1
    );
  };

  // Функция для отображения рейтинга в виде звезд
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <FaStar 
        key={index} 
        className={index < rating ? 'star filled' : 'star'} 
      />
    ));
  };

  return (
    <section className="reviews-section">
      <div className="container">
        <h2>Отзывы клиентов</h2>
        
        {/* Фильтр по категориям */}
        <div className="reviews-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => {
                setFilter(category);
                setCurrentIndex(0);
              }}
            >
              {category === 'all' ? 'Все отзывы' : category}
            </button>
          ))}
        </div>
        
        {/* Карусель отзывов */}
        <div className="reviews-carousel">
          <button className="carousel-btn prev" onClick={prevReview}>
            <FaChevronLeft />
          </button>
          
          <div className="reviews-container">
            {filteredReviews.map((review, index) => (
              <div 
                key={review.id}
                className={`review-card ${index === currentIndex ? 'active' : ''}`}
              >
                <FaQuoteLeft className="quote-icon" />
                <div className="review-content">
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                  <p className="review-text">"{review.text}"</p>
                  <div className="review-author">
                    <span className="author-name">{review.author}</span>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <span className="review-category">{review.category}</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-btn next" onClick={nextReview}>
            <FaChevronRight />
          </button>
        </div>
        
        {/* Индикаторы */}
        <div className="carousel-indicators">
          {filteredReviews.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;