# 快速开始指南

## 🚀 5分钟上手TypeScript版本

### 1. 安装依赖

```bash
pnpm install
```

> 如果没有安装pnpm，请先运行: `npm install -g pnpm`

### 2. 运行测试

```bash
pnpm test
```

你应该看到所有46个测试通过：

```
✓ src/kinwuzhao.test.ts (12 tests)
✓ src/utils.test.ts (22 tests)
✓ src/jieqi.test.ts (7 tests)
✓ src/ganzhi.test.ts (5 tests)
```

### 3. 构建项目

```bash
pnpm build
```

构建输出在 `dist/` 目录：
- `dist/index.js` - ESM模块
- `dist/index.cjs` - CommonJS模块
- `dist/index.d.ts` - TypeScript类型定义

### 4. 运行示例

```bash
node test-built.mjs
```

你应该看到类似输出：

```
=== 测试构建后的kinwuzhao库 ===

1. 干支计算:
  年干支: 乙巳
  月干支: 壬午
  日干支: 丁卯
  时干支: 丙午
  分干支: 甲子

2. 节气计算:
  当前节气: 夏至

3. 五兆随机分配排盘:
  兆宫: 金4 朱雀 休
  ...

✅ 所有功能测试通过！
```

## 📝 基本用法

### 创建新文件 `my-example.mjs`

```javascript
import { ganZhi, findCurrentJieQi, ganzhiPaiPan } from './dist/index.js';

// 1. 获取干支
const gz = ganZhi(2025, 6, 27, 11, 24);
console.log('日干支:', gz.day);  // 输出: 丁卯

// 2. 获取节气
const jq = findCurrentJieQi(2025, 6, 27, 11, 24);
console.log('节气:', jq);  // 输出: 夏至

// 3. 五兆排盘
const result = ganzhiPaiPan(gz, 0, jq, '五');
console.log('兆宫:', result.兆);
```

运行：

```bash
node my-example.mjs
```

## 🎯 主要功能

### 1. 干支计算

```javascript
import { ganZhi } from './dist/index.js';

const gz = ganZhi(2025, 6, 27, 11, 24);
// {
//   year: '乙巳',
//   month: '壬午',
//   day: '丁卯',
//   hour: '丙午',
//   minute: '甲子'
// }
```

### 2. 节气查询

```javascript
import { findCurrentJieQi, findJieQiDate, findSeason } from './dist/index.js';

// 当前节气
const current = findCurrentJieQi(2025, 6, 27, 11, 24);
console.log(current);  // '夏至'

// 节气日期
const date = findJieQiDate(2025, '春分');
console.log(date);  // Date对象

// 节气对应季节
const season = findSeason('春分');
console.log(season);  // '春'
```

### 3. 五兆排盘

#### 随机分配模式

```javascript
import { fiveZhaoPaiPan } from './dist/index.js';

const result = fiveZhaoPaiPan(
  0,          // 起卦数字
  '夏至',     // 节气
  '五',       // 农历月
  '丁卯',     // 日干支
  '丙午'      // 时干支
);

console.log(result.兆);
// {
//   宮位: '兆',
//   數字: 4,
//   五行: '金',
//   六獸: '朱雀',
//   旺相: '休',
//   ...
// }
```

#### 干支起盘模式

```javascript
import { ganZhi, findCurrentJieQi, ganzhiPaiPan } from './dist/index.js';

const gz = ganZhi(2025, 6, 27, 11, 24);
const jq = findCurrentJieQi(2025, 6, 27, 11, 24);

const result = ganzhiPaiPan(
  gz,         // 干支对象
  0,          // 额外数字
  jq,         // 节气
  '五'        // 农历月
);

console.log(result.兆);
console.log(result.木鄉);
console.log(result.火鄉);
console.log(result.土鄉);
console.log(result.金鄉);
console.log(result.水鄉);
```

## 📚 更多示例

查看 `examples/` 目录：

- `examples/basic.ts` - 基本用法示例
- `examples/advanced.ts` - 高级功能示例

## 🛠️ 开发命令

```bash
# 开发模式（自动重新构建）
pnpm dev

# 运行测试（单次）
pnpm test

# 运行测试（watch模式）
pnpm test:watch

# 测试覆盖率
pnpm test:coverage

# 类型检查
pnpm type-check

# 代码格式化
pnpm format

# 代码检查
pnpm lint
```

## ❓ 常见问题

### Q: 如何在TypeScript项目中使用？

A: 直接导入即可，完整的类型定义会自动加载：

```typescript
import { ganZhi, GanZhiResult } from 'kinwuzhao';

const gz: GanZhiResult = ganZhi(2025, 6, 27, 11, 24);
```

### Q: 如何在Node.js CommonJS项目中使用？

A: 使用require导入CJS版本：

```javascript
const { ganZhi, findCurrentJieQi } = require('kinwuzhao');
```

### Q: 节气计算和Python版本有差异？

A: 可能有轻微差异（分钟级别），这是因为使用了不同的天文计算库。如果需要更高精度，可以调整实现。

### Q: 如何贡献代码？

A: 欢迎提交PR！请确保：
1. 所有测试通过 (`pnpm test`)
2. 代码格式正确 (`pnpm format`)
3. 类型检查通过 (`pnpm type-check`)

## 📖 完整文档

- [README.zh-CN.md](./README.zh-CN.md) - 完整使用文档
- [MIGRATION.zh-CN.md](./MIGRATION.zh-CN.md) - 迁移说明

## 🎉 开始使用吧！

现在你已经准备好使用TypeScript版本的五兆占卜系统了。祝使用愉快！
