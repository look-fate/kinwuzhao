/**
 * 五兆占卜系统 - 高级示例
 */

import {
  ganZhi,
  findCurrentJieQi,
  findJieQiDate,
  findSeason,
  ganzhiPaiPan,
  TWENTY_FOUR_SOLAR_TERMS,
  JIAZI,
} from '../src/index.js';

// 示例1：查询2025年所有节气
console.log('=== 示例1：2025年二十四节气 ===');
TWENTY_FOUR_SOLAR_TERMS.forEach((jieqi) => {
  const date = findJieQiDate(2025, jieqi);
  if (date) {
    const season = findSeason(jieqi);
    console.log(
      `${jieqi}[${season}]: ${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    );
  }
});
console.log();

// 示例2：比较不同时间的排盘结果
console.log('=== 示例2：不同时间的排盘对比 ===');

const times = [
  { year: 2025, month: 3, day: 20, hour: 12, minute: 0, desc: '春分' },
  { year: 2025, month: 6, day: 21, hour: 12, minute: 0, desc: '夏至' },
  { year: 2025, month: 9, day: 23, hour: 12, minute: 0, desc: '秋分' },
  { year: 2025, month: 12, day: 21, hour: 12, minute: 0, desc: '冬至' },
];

times.forEach(({ year, month, day, hour, minute, desc }) => {
  const gz = ganZhi(year, month, day, hour, minute);
  const jq = findCurrentJieQi(year, month, day, hour, minute);
  const result = ganzhiPaiPan(gz, 0, jq, '五');

  console.log(`${desc}时刻 (${year}-${month}-${day}):`);
  console.log(`  节气: ${jq}`);
  console.log(`  日干支: ${gz.day}`);
  console.log(`  兆宫: ${result.兆?.五行}${result.兆?.數字} ${result.兆?.六獸}`);
  console.log();
});

// 示例3：展示六十甲子循环
console.log('=== 示例3：六十甲子 ===');
console.log('前10个甲子:');
JIAZI.slice(0, 10).forEach((gz, index) => {
  console.log(`  ${index + 1}. ${gz}`);
});
console.log('...');
console.log('后10个甲子:');
JIAZI.slice(-10).forEach((gz, index) => {
  console.log(`  ${index + 51}. ${gz}`);
});
console.log();

// 示例4：多次排盘统计（展示随机性）
console.log('=== 示例4：随机性统计 ===');
import { fiveZhaoPaiPan } from '../src/index.js';

const stats: Record<number, number> = {};
const iterations = 100;

for (let i = 0; i < iterations; i++) {
  const result = fiveZhaoPaiPan(0, '夏至', '五', '甲子', '庚午');
  if (result.兆) {
    const num = result.兆.數字;
    stats[num] = (stats[num] || 0) + 1;
  }
}

console.log(`运行${iterations}次五兆排盘，兆宫数字分布：`);
Object.entries(stats)
  .sort(([a], [b]) => Number(a) - Number(b))
  .forEach(([num, count]) => {
    const percentage = ((count / iterations) * 100).toFixed(1);
    const bar = '█'.repeat(Math.floor(count / 2));
    console.log(`  ${num}: ${bar} ${count}次 (${percentage}%)`);
  });
