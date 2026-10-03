import type { Config } from 'tailwindcss';

export default {
  // Night is a set of token values on <html data-theme="dark">, so most
  // classes need nothing; `dark:` is there for the rare one that does.
  darkMode: ['selector', '[data-theme="dark"]'],
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
        copy: 'var(--copy)',
        'rule-strong': 'var(--rule-strong)',
        wash: 'var(--wash)',
        panel: {
          DEFAULT: 'var(--panel)',
          ink: 'var(--panel-ink)',
        },

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
      boxShadow: {
        lift: 'var(--lift)',
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
