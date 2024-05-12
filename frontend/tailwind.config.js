

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
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
