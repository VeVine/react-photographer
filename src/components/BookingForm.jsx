import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  // Пакеты услуг
  const packages = [
    { id: 'basic', name: 'Базовый', price: 5000, description: '1 час съемки, 10 обработанных фото' },
    { id: 'standard', name: 'Стандартный', price: 10000, description: '2 часа съемки, 25 обработанных фото' },
    { id: 'premium', name: 'Премиум', price: 20000, description: '4 часа съемки, 50 обработанных фото + фотоальбом' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setError('');
    
    // Находим выбранный пакет
    const packageInfo = packages.find(pkg => pkg.id === selectedPackage);
    
    // Подготовка данных для отправки
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: selectedDate ? selectedDate.toLocaleString('ru-RU') : 'Не указана',
      package: packageInfo ? packageInfo.name : 'Не выбран',
      price: packageInfo ? packageInfo.price.toLocaleString() : '0',
      notes: formData.notes || 'Без дополнительных пожеланий',
      to_email: 'testemail@mail.ru' // email
    };

    // Отправка через EmailJS
    emailjs.send(
      'service_u33lghp',     // Service ID
      'template_c29m09s',    //  Template ID
      templateParams,
      'cJ3T2GYuvskCdLIl8'         //  User ID
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setIsSubmitted(true);
      setIsSending(false);
      
      
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedDate(null);
        setSelectedPackage('');
        setFormData({
          name: '',
          email: '',
          phone: '',
          notes: ''
        });
      }, 5000);
    })
    .catch((err) => {
      console.error('FAILED...', err);
      setError('Ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь по телефону.');
      setIsSending(false);
    });
  };

  // Находим выбранный пакет для отображения цены
  const selectedPackageInfo = packages.find(pkg => pkg.id === selectedPackage);

  return (
    <div className="booking-form-container">
      <h2>Забронировать фотосессию</h2>
      
      {error && (
        <div className="error-message">
          <FaExclamationTriangle className="error-icon" />
          <p>{error}</p>
        </div>
      )}
      
      {isSubmitted ? (
        <div className="success-message">
          <FaCheck className="success-icon" />
          <h3>Заявка отправлена!</h3>
          <p>Мы свяжемся с вами в ближайшее время для подтверждения деталей.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label><FaUser /> Имя</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              placeholder="Ваше имя" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label><FaEnvelope /> Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              placeholder="example@mail.com" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label><FaPhone /> Телефон</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleInputChange} 
              placeholder="+7 (999) 999-99-99" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label><FaCalendarAlt /> Дата и время</label>
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="Время"
              dateFormat="dd.MM.yyyy HH:mm"
              minDate={new Date()}
              placeholderText="Выберите дату и время"
              className="date-picker"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Пакет услуг</label>
            <div className="package-options">
              {packages.map(pkg => (
                <div 
                  key={pkg.id}
                  className={`package-option ${selectedPackage === pkg.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <input 
                    type="radio"
                    name="package"
                    value={pkg.id}
                    checked={selectedPackage === pkg.id}
                    onChange={() => {}}
                    hidden
                  />
                  <h3>{pkg.name}</h3>
                  <p>{pkg.description}</p>
                  <div className="price">{pkg.price.toLocaleString()} ₽</div>
                </div>
              ))}
            </div>
          </div>
          
          {selectedPackageInfo && (
            <div className="selected-package-info">
              <h3>Вы выбрали: {selectedPackageInfo.name}</h3>
              <p>{selectedPackageInfo.description}</p>
              <p className="price">Стоимость: {selectedPackageInfo.price.toLocaleString()} ₽</p>
            </div>
          )}
          
          <div className="form-group">
            <label>Дополнительные пожелания</label>
            <textarea 
              name="notes" 
              value={formData.notes} 
              onChange={handleInputChange} 
              placeholder="Расскажите о ваших идеях, локациях и т.д."
              rows={4}
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={!selectedDate || !selectedPackage || isSending}
          >
            {isSending ? 'Отправка...' : 'Отправить заявку'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;