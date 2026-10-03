'use client';

import { useSyncExternalStore } from 'react';
import { currentTheme, type Theme } from './theme';

/*
The theme on <html>, as React state.

Watches the attribute rather than holding a copy, so the button, the OS
listener and anything else that sets it all agree. The server has no
<html> to read and says 'light'; React swaps in the real value right
after hydration without a mismatch.
*/

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, currentTheme, () => 'light');
}
