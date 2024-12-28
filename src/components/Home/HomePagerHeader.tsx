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

    if (numericHours < 18) {
      return (
        <FontAwesomeIcon
          icon={faSun}
          size="sm"
          color="gold"
          className="hover:animate-spin"
          style={{ marginRight: '8px' }}
        />
      );
    }
    return (
      <FontAwesomeIcon
        icon={faMoon}
        size="sm"
        color="dodgerblue"
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
