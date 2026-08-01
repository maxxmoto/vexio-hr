/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'max-md:bg-emerald-400',
    'max-md:bg-purple-500',
    'max-md:bg-rose-500',
    'max-md:bg-blue-500',
    'max-md:text-black',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
