module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#111111',
      white: '#fff',
      gray: {
        700: '#787a7b',
        800: '#1E1F23',
        900: '#131517'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
