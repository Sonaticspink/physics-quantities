import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base: GitHub Pages เสิร์ฟที่ /<repo>/ จึงต้องตั้งผ่าน VITE_BASE ใน workflow
// ส่วน Vercel/Netlify เสิร์ฟที่ root จึงปล่อยเป็น "/" ตามค่าเริ่มต้น
const base = process.env.VITE_BASE || '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
