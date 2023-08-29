import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        inherit: 'inherit',
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000000',
        white: '#fff6e2',
        blue: '#0000FF',
        pageBG: 'var(--pageBG)',
        pageText: 'var(--pageText)',
        faded: 'var(--faded)',
      },
    },
  },
  plugins: [],
};
export default config;
