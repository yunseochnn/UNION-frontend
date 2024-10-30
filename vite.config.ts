import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 모든 IP 주소에서 접근 가능하도록 설정
    port: 5173, // 포트를 지정합니다.
  },
});
