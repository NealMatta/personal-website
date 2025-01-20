'use client';
import React from 'react';
import PageHeader from '../../reusable/pageHeader/PageHeader';
import moment from 'moment-timezone';
// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const HomePageHeader = () => {
  const clientTimeZone = moment.tz.guess(); // Guess the client's timezone

  const getHeader = () => {
    const currentHour = moment.tz(clientTimeZone).hour(); // Get the current hour in the client's timezone
    if (currentHour < 12) return 'Good Morning!';
    else if (currentHour < 18) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  const getIcon = () => {
    const currentHour = moment.tz(clientTimeZone).hour(); // Get the current hour in the client's timezone
    const size = 'sm';

    if (currentHour < 16) {
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
    const formattedDate = moment
      .tz(clientTimeZone)
      .format('dddd, MMMM Do, YYYY');
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
