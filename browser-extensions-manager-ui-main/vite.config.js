import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Add this line exactly:
  base: '/Frontend-Mentor-Challenges-Solutions/browser-extensions-manager-ui-main/',
})
