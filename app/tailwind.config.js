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
      },
      blue: {
        100: 'rgba(45, 129, 255, 0.15)',
        200: 'rgba(45, 129, 255, 0.25)',
        300: 'rgba(45, 129, 255, 0.35)',
        900: 'rgb(45, 129, 255)'
      },
      green: {
        900: '#16c784'
      },
      red: {
        900: '#ea3943'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
