export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('./src/assets/login-bg.jpg')",
        'register-bg': "url('./src/assets/register-bg.jpg')",
      },
      backgroundColor: {
        'primary': 'rgb(255,87,87, .79)',
      },
      colors: {
        'primary': 'rgb(255,87,87, .79)',
        'secondary': 'rgb(255,87,87, .9)'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
