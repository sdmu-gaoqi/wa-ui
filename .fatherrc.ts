import { defineConfig } from 'father';

export default defineConfig({
  cjs: {
    output: 'build',
    alias: {
      '@': '/src',
      '@assets': '/assets',
    },
  },
  esm: {
    output: 'es',
    alias: {
      '@': '/src',
      '@assets': '/assets',
    },
  },
  // lessInBabelMode: true,
  umd: {
    entry: '/src/entry.ts',
    extractCSS: false,
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      { libraryName: 'antd', libraryDirectory: 'es', style: true },
      'antd',
    ],
  ],
});
