import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // Main entry point
        appointments: path.resolve(__dirname, 'src/pages/Appointments.jsx'),
        calendar: path.resolve(__dirname, 'src/pages/Calendar.jsx'),
        dashboard: path.resolve(__dirname, 'src/pages/Dashboard.jsx'),
        login: path.resolve(__dirname, 'src/pages/Login.jsx'),
        profile: path.resolve(__dirname, 'src/pages/Profile.jsx'),
        register: path.resolve(__dirname, 'src/pages/Register.jsx')
      }
    }
  }
});
