# waBaseui

### 旧版本无法生成.d.ts 文件问题

解决方案

1. package 文件 build 时同时执行 tsc -p ./tsconfig.dist.json -emitDeclarationOnly && tsc-alias -p ./tsconfig.dist.json

2. (Now) 升级版本 后续不支持 lessInBabelMode 属性 => 思想 esm cjs 将文件解析交给业务方 计划 less 全面转换为 css-in-js 方案
