export default [
  {
    target: 'node',
    cjs: { type: 'babel', lazy: true },
    esm: 'babel',
    disableTypeCheck: true,
    lessInBabelMode: true,
    extractCSS: true,
    extraBabelPlugins: [
      [
        'babel-plugin-import',
        { libraryName: 'antd', libraryDirectory: 'es', style: true },
        'antd',
      ],
    ],
  },
];
