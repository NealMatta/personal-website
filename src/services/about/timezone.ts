'use client';

export const getClientTimeZone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
