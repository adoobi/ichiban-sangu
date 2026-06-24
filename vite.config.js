import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/ichiban-sangu/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})