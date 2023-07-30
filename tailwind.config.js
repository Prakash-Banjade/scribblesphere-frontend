/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Poppins', 'sans-serif'],
        blog: ['IBM Plex Sans', 'sans-serif'],
      },
      colors: {
        primary: '#0bbe64',

        darkBg: '#212222',
        lightBg: '#f2f4f7',

        dark: '#0d1117',

        'text-100': '#f7f8f9',
        'text-900': '#111211',


        darkLight: '#2a2a2a',
        
        lineColorDark: '#434343',
        lineColorLight: '#ced3da',
        error: '#d32f2f',
        textWhite: '#e5e7eb',
      },
    },
  },
  plugins: [],
}

