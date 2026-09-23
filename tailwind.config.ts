import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        card: 'var(--card)',
        ink: 'var(--ink)',
        pencil: 'var(--pencil)',
        graphite: 'var(--graphite)',
        rule: 'var(--rule)',
        tape: 'var(--tape)',
        marker: 'var(--marker)',

        status: {
          live: 'var(--live)',
          prototype: 'var(--prototype)',
          shelved: 'var(--shelved)',
        },

        // Kept so components not yet redesigned still compile.
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        label: ['var(--font-label)', 'cursive'],
      },
      borderRadius: {
        box: '6px',
        window: '28px',
      },
      animation: {
        twinkle: 'twinkle 5s ease-in-out infinite',
        dipper: 'dipper 7s ease-in-out infinite',
        drift: 'drift var(--d) linear var(--dl) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
