# kinwuzhao

五兆占卜排盘系统的 TypeScript 实现，移植自 [Python 原版](https://github.com/kinwuzhao/kinwuzhao)。

## 安装

```bash
pnpm add kinwuzhao
```

## 快速上手

```typescript
import { ganZhi, findCurrentJieQi, ganzhiPaiPan } from 'kinwuzhao';

// 1. 获取干支（年、月、日、时、分）
const gz = ganZhi(2025, 6, 27, 11, 24);
// => { year: '乙巳', month: '壬午', day: '丁卯', hour: '丙午', minute: '庚戌' }

// 2. 获取当前节气
const jq = findCurrentJieQi(2025, 6, 27, 11, 24);
// => '夏至'

// 3. 干支排盘
const result = ganzhiPaiPan(gz, 0, jq, '');
console.log(result);
```

## API

### `ganZhi(year, month, day, hour, minute)`

将公历日期时间转换为年月日时分干支。

- **返回**: `{ year, month, day, hour, minute }` — 各柱干支字符串

### `findCurrentJieQi(year, month, day, hour, minute)`

根据日期时间查找当前所处节气。

### `ganzhiPaiPan(gzList, num, jq, cm, liurenData?)`

干支起盘，根据年月日时分干支计算五兆排盘结果。返回六宫位（兆、木乡、火乡、土乡、金乡、水乡）的完整信息，包括五行、六兽、六亲、旺相、孤虚等。

### `fiveZhaoPaiPan(num, jq, cm, gz1, gz2, liurenData?)`

五兆随机分配排盘（基数 36，随机分割取模 5）。

### 工具函数

| 函数 | 说明 |
|------|------|
| `findLunarHour(dayGanZhi)` | 五鼠遁 — 根据日干推算十二时辰干支 |
| `findLunarMonth(yearGanZhi)` | 五虎遁 — 根据年干推算十二月干支 |
| `findLunarMinute(hourGanZhi)` | 五狗遁 — 根据子时干支推算分干支 |
| `generateJiaZi()` | 生成六十甲子序列 |
| `getWuXing(ganOrZhi)` | 获取天干/地支/八卦的五行属性 |
| `findSeason(jieqi)` | 根据节气查找季节 |

## 开发

```bash
pnpm install        # 安装依赖
pnpm run build      # 构建
pnpm run test       # 运行测试
pnpm run dev        # 监听模式构建
```

## 依赖

- [tyme4ts](https://github.com/6tail/tyme4ts) — 日历、八字、节气计算

## License

MIT
