export default [{
  target: 'node',
  cjs: { type: 'babel', lazy: true },
  // cjs: false,
  esm: 'babel',
  disableTypeCheck: true,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      { libraryName: 'antd', libraryDirectory: 'es', style: true },
      'antd',
    ],
  ],
}];
