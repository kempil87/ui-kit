import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svg from '@neodx/svg/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svg({
      root: 'assets/icons',
      output: 'public/images/svg-sprites',
      group: true,
      fileName: '{name}.{hash:8}.svg',
      metadata: {
        path: 'src/shared/types/icon.ts',
        runtime: {
          viewBox: true,
        },
      },
    }),
  ],
});
