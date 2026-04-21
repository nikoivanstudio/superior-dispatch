import { defineConfig } from 'vite';
import { reactCompilerPreset } from '@vitejs/plugin-react';
import { reactRouter } from '@react-router/dev/vite';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    reactRouter(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
