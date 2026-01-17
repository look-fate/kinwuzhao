# **Kinwuzhao (堅五兆) - TypeScript实现**

[![NPM Version](https://img.shields.io/npm/v/kinwuzhao.svg)](https://www.npmjs.com/package/kinwuzhao)
[![License](https://img.shields.io/npm/l/kinwuzhao.svg)](LICENSE)

五兆占卜排盘系统的TypeScript实现。

## 📖 简介

五兆是汉语词汇中记载的古代占卜方法，其核心定义源自《旧唐书·太宗纪上》。该方法在唐宋文献中多次出现，如宋代梅尧臣《江南杂感》诗及赵彦卫《云麓漫钞》均提及其实践方式，敦煌出土文献则保存了唐代五兆卜法的具体操作流程与卦象解析文本。

本项目将原Python实现转换为TypeScript库，提供现代化的API和完整的类型支持。

## ✨ 特性

- 🎯 **完整功能**：支持五兆随机分配和干支起盘两种模式
- 📅 **节气计算**：精确计算二十四节气
- 🌟 **干支转换**：准确的公历到干支转换
- 📦 **TypeScript**：完整的类型定义
- ✅ **测试覆盖**：完善的单元测试
- 🚀 **现代化**：使用ESM模块系统

## 📦 安装

使用pnpm（推荐）：

```bash
pnpm add kinwuzhao
```

使用npm：

```bash
npm install kinwuzhao
```

使用yarn：

```bash
yarn add kinwuzhao
```

## 🚀 快速开始

### 基本用法

```typescript
import { ganZhi, findCurrentJieQi, fiveZhaoPaiPan } from 'kinwuzhao';

// 1. 获取干支
const gz = ganZhi(2025, 6, 27, 11, 24);
console.log(gz);
// { year: '乙巳', month: '壬午', day: '甲子', hour: '庚午', minute: '己卯' }

// 2. 获取当前节气
const jq = findCurrentJieQi(2025, 6, 27, 11, 24);
console.log(jq); // '夏至'

// 3. 五兆排盘（随机分配模式）
const result = fiveZhaoPaiPan(0, jq, '五', gz.day, gz.hour);
console.log(result);
```

### 干支起盘模式

```typescript
import { ganZhi, findCurrentJieQi, ganzhiPaiPan } from 'kinwuzhao';

// 获取干支
const gz = ganZhi(2025, 6, 27, 11, 24);

// 获取节气
const jq = findCurrentJieQi(2025, 6, 27, 11, 24);

// 干支起盘
const result = ganzhiPaiPan(gz, 0, jq, '五');
console.log(result);

// 输出包含六个宫位的信息
console.log(result.兆);     // 巽宫（兆）
console.log(result.木鄉);   // 震宫
console.log(result.火鄉);   // 离宫
console.log(result.土鄉);   // 中宫
console.log(result.金鄉);   // 兑宫
console.log(result.水鄉);   // 坎宫
```

### 节气查询

```typescript
import { findJieQiDate, findSeason, distanceToJieQi } from 'kinwuzhao';

// 查找2025年春分的日期
const chunfenDate = findJieQiDate(2025, '春分');
console.log(chunfenDate); // 2025年3月20日

// 查找节气对应的季节
const season = findSeason('春分');
console.log(season); // '春'

// 计算距离节气的天数
const distance = distanceToJieQi(2025, 6, 27, '夏至');
console.log(distance); // 距离夏至的天数
```

## 📚 API文档

### 干支计算

#### `ganZhi(year, month, day, hour, minute)`

将公历日期转换为干支。

**参数：**
- `year`: 年份
- `month`: 月份 (1-12)
- `day`: 日期
- `hour`: 小时 (0-23)
- `minute`: 分钟 (0-59)

**返回：** `GanZhiResult`
```typescript
{
  year: string;    // 年干支
  month: string;   // 月干支
  day: string;     // 日干支
  hour: string;    // 时干支
  minute: string;  // 分干支
}
```

### 节气计算

#### `findCurrentJieQi(year, month, day, hour, minute)`

查找当前时间所处的节气。

**返回：** 节气名称（如"春分"、"夏至"等）

#### `findJieQiDate(year, jieqiName)`

查找指定年份某个节气的日期。

**返回：** `Date` 或 `null`

#### `findSeason(jieqi)`

根据节气查找对应的季节。

**返回：** "春"、"夏"、"秋"或"冬"

### 五兆排盘

#### `fiveZhaoPaiPan(num, jq, cm, gz1, gz2, liurenData?)`

五兆随机分配排盘。

**参数：**
- `num`: 起卦数字
- `jq`: 节气
- `cm`: 农历月
- `gz1`: 干支1（用于配六兽）
- `gz2`: 干支2（用于孤虚）
- `liurenData`: 可选的六壬数据

**返回：** `WuZhaoPaiPanResult`

#### `ganzhiPaiPan(gzList, num, jq, cm, liurenData?)`

干支起盘模式。

**参数：**
- `gzList`: 干支列表（由`ganZhi()`返回）
- `num`: 额外数字
- `jq`: 节气
- `cm`: 农历月
- `liurenData`: 可选的六壬数据

**返回：** `WuZhaoPaiPanResult`

### 排盘结果结构

```typescript
interface WuZhaoPaiPanResult {
  兆?: GongWeiInfo;     // 巽宫
  木鄉?: GongWeiInfo;   // 震宫
  火鄉?: GongWeiInfo;   // 离宫
  土鄉?: GongWeiInfo;   // 中宫
  金鄉?: GongWeiInfo;   // 兑宫
  水鄉?: GongWeiInfo;   // 坎宫
  錯誤?: string;        // 错误信息
}

interface GongWeiInfo {
  宮位: string;    // 宫位名称
  宮位1: string;   // 宫位八卦
  旺相: string;    // 旺相状态
  數字: number;    // 数字(1-5)
  五行: string;    // 五行
  六獸: string;    // 六兽
  六獸死: string;  // 六兽死
  六獸害: string;  // 六兽害
  六親: string;    // 六亲
  孤: string;      // 孤
  虛: string;      // 虚
  關: string;      // 关
  籥: string;      // 钥
  將軍: string;    // 将军
}
```

## 🧪 开发

### 安装依赖

```bash
pnpm install
```

### 运行测试

```bash
pnpm test
```

### 查看测试覆盖率

```bash
pnpm test:coverage
```

### 运行测试UI

```bash
pnpm test:ui
```

### 构建

```bash
pnpm build
```

### 类型检查

```bash
pnpm type-check
```

### 代码格式化

```bash
pnpm format
```

### Linting

```bash
pnpm lint
```

## 📝 示例

查看 `examples` 目录获取更多示例：

- `examples/basic.ts` - 基本用法
- `examples/advanced.ts` - 高级用法  
- `examples/complete-output.mjs` - 完整输出示例（可直接运行）

### 运行完整输出示例

```bash
node examples/complete-output.mjs
```

这将展示：
- ✅ 详细的干支计算过程
- ✅ 节气信息
- ✅ 完整的排盘结果（六个宫位）
- ✅ 格式化的盘面显示
- ✅ 断卦要点分析
- ✅ 随机排盘演示
- ✅ 多次排盘对比
- ✅ 四季节气对比

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

本项目基于原Python实现转换而来，感谢原作者的贡献。

## 📚 参考文献

- 《旧唐书·太宗纪上》
- 宋代梅尧臣《江南杂感》
- 赵彦卫《云麓漫钞》
- 敦煌文献 P.2859《五兆要诀略》
