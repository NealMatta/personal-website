'use client';

import { useEffect } from 'react';
import { followSystemTheme } from '@/src/lib/theme/theme';

/*
Keeps the page in step with the OS setting while the visitor hasn't
picked a side, so switching the OS to dark at dusk takes the site with
it. Renders nothing; the first theme was already set by the script in
<head>.
*/
export default function ThemeRoot() {
  useEffect(() => followSystemTheme(), []);
  return null;
}
