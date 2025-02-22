import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    include: ['./src/__tests__/**/*.{ts,tsx}'],
    exclude: [
      'node_modules/**',
      'var/**',
      '**/dist/**',
      './src/__tests__/setup.ts',
      './src/main.tsx',
      './src/App.tsx',
    ],
    coverage: {
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/__tests__/setup.ts',
        './src/main.tsx',
        './src/App.tsx',
      ],
    },
  },
});
