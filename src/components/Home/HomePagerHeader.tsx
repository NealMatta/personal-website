import React from 'react';
import PageHeader from '../PageHeader/PageHeader';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const HomePageHeader = () => {
  const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const getHeader = () => {
    const hours = new Date().toLocaleString('en-US', {
      timeZone: clientTimeZone,
      hour: '2-digit',
      hour12: false,
    });
    const numericHours = parseInt(hours, 10);
    if (numericHours < 12) return 'Good Morning!';
    else if (numericHours < 18) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  const getIcon = () => {
    const hours = new Date().toLocaleString('en-US', {
      timeZone: clientTimeZone,
      hour: '2-digit',
      hour12: false,
    });
    const numericHours = parseInt(hours, 10);

    const size = 'sm';

    if (numericHours < 16) {
      return (
        <FontAwesomeIcon
          icon={faSun}
          size={size}
          color="#F7AB02"
          className="hover:animate-spin-slow"
          style={{ marginRight: '8px' }}
        />
      );
    }
    return (
      <FontAwesomeIcon
        icon={faMoon}
        size={size}
        color="#193154"
        className="hover:animate-pulse"
        style={{ marginRight: '8px' }}
      />
    );
  };

  const getSubHeader = () => {
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: clientTimeZone,
    }).format(date);

    return `It's ${formattedDate}`;
  };

  return (
    <PageHeader
      header={
        <>
          {getIcon()}
          {getHeader()}
        </>
      }
      subHeader={getSubHeader()}
    />
  );
};

export default HomePageHeader;
