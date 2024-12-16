import React from 'react';

const PageHeader = () => {
  const getHeader = () => {
    const hours = new Date().toLocaleString('en-US', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Replace or keep dynamic time zone
      hour: '2-digit',
      hour12: false,
    });
    const numericHours = parseInt(hours, 10);
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    if (numericHours < 12) return 'Good Morning!';
    else if (numericHours < 18) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  const getSubHeader = () => {
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Replace or keep dynamic time zone
    }).format(date);

    return `It's ${formattedDate}`;
  };

  return (
    <div className="page-header">
      <h1 className="text-4xl font-bold">{getHeader()}</h1>
      <h3 className="text-2xl">{getSubHeader()}</h3>
    </div>
  );
};

export default PageHeader;
