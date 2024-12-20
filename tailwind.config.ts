import type { Config } from 'tailwindcss';
import {} from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        primary: {
          DEFAULT: 'var(--primary-color)',
          light: 'var(--primary-color-light)',
          dark: 'var(--primary-color-dark)',
        },
        secondary: {
          DEFAULT: 'var(--secondary-color)',
          light: 'var(--secondary-color-light)',
          dark: 'var(--secondary-color-dark)',
        },
      },
      animation: {
        marquee: 'marquee 2s linear 1 forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
