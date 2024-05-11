

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('./src/assets/login-image.jpg')",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
