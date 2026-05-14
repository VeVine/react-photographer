import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <h1>Обо мне</h1>
      <div className="about-content">
        <div className="bio">
          <h2>Привет, я Анна - профессиональный фотограф</h2>
          <p>
            Специализируюсь на свадебной и портретной фотографии. 
            Опыт работы - более 7 лет. Люблю создавать естественные 
            и эмоциональные кадры, которые будут радовать вас долгие годы.
          </p>
          <p>
            Образование: Московская школа фотографии и мультимедиа им. Родченко.
            Участник международных выставок и конкурсов.
          </p>
        </div>
        <div className="photo">
          {/* Заглушка для фото фотографа */}
          <div className="photographer-photo" />
        </div>
      </div>
    </div>
  );
};

export default About;