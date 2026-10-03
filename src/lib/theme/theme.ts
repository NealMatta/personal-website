/*
Day or night.

The page follows the visitor's OS setting until they press the sun/moon
button. A press that lands back on what the OS would have picked clears
the override instead of storing it, so there is never an "Auto" to find:
the site is either following the OS or holding the visitor's last word.

The theme lives on <html> as `data-theme`, where globals.css reads it.
The script in app/layout.tsx sets it before the first paint; everything
here runs after that.
*/

export type Theme = 'light' | 'dark';

/** Where the visitor's override is kept. Absent means "follow the OS". */
export const THEME_KEY = 'theme';

const DARK_QUERY = '(prefers-color-scheme: dark)';

/*
Inlined into <head> by app/layout.tsx so the theme is on <html> before
anything paints. Keep it in step with `systemTheme` and `storedTheme`.
*/
export const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem('${THEME_KEY}');var d=s?s==='dark':matchMedia('${DARK_QUERY}').matches;document.documentElement.dataset.theme=d?'dark':'light'}catch(e){}})()`;

export function systemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
}

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/** Put a theme on the page and remember it, unless it's the OS's own. */
export function chooseTheme(theme: Theme) {
  try {
    if (theme === systemTheme()) localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage blocked: the switch still works for this visit.
  }
  document.documentElement.dataset.theme = theme;
}

/**
 * Follow the OS while the visitor hasn't overridden it. Returns the
 * unsubscribe.
 */
export function followSystemTheme(): () => void {
  const query = window.matchMedia(DARK_QUERY);
  const onChange = () => {
    if (storedTheme() === null) {
      document.documentElement.dataset.theme = query.matches ? 'dark' : 'light';
    }
  };
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}
