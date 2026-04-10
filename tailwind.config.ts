import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0B',
          secondary: '#131316',
          card: '#1A1A1F',
          hover: '#222228',
          border: '#2A2A32',
        },
        score: {
          gray: '#6B7280',
          red: '#EF4444',
          orange: '#F97316',
          green: '#22C55E',
          gold: '#EAB308',
        },
        accent: {
          blue: '#3B82F6',
          cyan: '#06B6D4',
        },
        text: {
          primary: '#F5F5F7',
          secondary: '#A1A1AA',
          muted: '#71717A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
