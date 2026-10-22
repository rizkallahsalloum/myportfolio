import React, { useState, useEffect } from 'react';
import './CountryTime.scss';

const TIME_ZONE = 'Europe/Minsk';

const CountryTime = () => {
  const [countryTime, setCountryTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 24-hour format
        timeZone: TIME_ZONE,
      });

      const formattedTime = formatter.format(now);
      setCountryTime(formattedTime);
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="country-time">
      <span className="country-time__label">Belarus Time:</span>
      {countryTime === null ? (
        <span className="country-time__value country-time__value--loading">
          Loading...
        </span>
      ) : (
        <time className="country-time__value">{countryTime}</time>
      )}
      <span className="country-timing-clock__offset">UTC+3</span>
    </div>
  );
};

export default CountryTime;
