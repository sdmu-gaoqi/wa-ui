import { defineConfig } from 'father';

export default defineConfig({
  cjs: {
    output: 'lib',
  },
  esm: {
    output: 'es',
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
