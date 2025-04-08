import { Rubik, Lora } from 'next/font/google';

export const primaryText = Rubik({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify weights for Rubik
  variable: '--font-primary-font', // CSS variable for easy usage
});

export const secondaryText = Lora({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify weights for Lora
  style: ['normal', 'italic'], // Add italic if needed
  variable: '--font-secondary-font', // CSS variable for Lora
});
