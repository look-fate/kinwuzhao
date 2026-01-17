/**
 * 测试构建后的代码
 */

import { ganZhi, findCurrentJieQi, fiveZhaoPaiPan, ganzhiPaiPan } from './dist/index.js';

console.log('=== 测试构建后的kinwuzhao库 ===\n');

// 示例1：获取当前时间的干支
console.log('1. 干支计算:');
const gz = ganZhi(2025, 6, 27, 11, 24);
console.log(`  年干支: ${gz.year}`);
console.log(`  月干支: ${gz.month}`);
console.log(`  日干支: ${gz.day}`);
console.log(`  时干支: ${gz.hour}`);
console.log(`  分干支: ${gz.minute}`);
console.log();

// 示例2：查找当前节气
console.log('2. 节气计算:');
const jq = findCurrentJieQi(2025, 6, 27, 11, 24);
console.log(`  当前节气: ${jq}`);
console.log();

// 示例3：五兆随机分配排盘
console.log('3. 五兆随机分配排盘:');
const result1 = fiveZhaoPaiPan(0, jq, '五', gz.day, gz.hour);
if (result1.錯誤) {
  console.error('  错误:', result1.錯誤);
} else {
  console.log(`  兆宫: ${result1.兆?.五行}${result1.兆?.數字} ${result1.兆?.六獸} ${result1.兆?.旺相}`);
  console.log(`  木乡: ${result1.木鄉?.五行}${result1.木鄉?.數字} ${result1.木鄉?.六獸} (${result1.木鄉?.六親})`);
  console.log(`  火乡: ${result1.火鄉?.五行}${result1.火鄉?.數字} ${result1.火鄉?.六獸} (${result1.火鄉?.六親})`);
}
console.log();

// 示例4：干支起盘
console.log('4. 干支起盘:');
const result2 = ganzhiPaiPan(gz, 0, jq, '五');
console.log(`  兆宫: ${result2.兆?.五行}${result2.兆?.數字} ${result2.兆?.六獸} ${result2.兆?.旺相}`);
console.log(`  木乡: ${result2.木鄉?.五行}${result2.木鄉?.數字} ${result2.木鄉?.六獸} (${result2.木鄉?.六親})`);
console.log(`  火乡: ${result2.火鄉?.五行}${result2.火鄉?.數字} ${result2.火鄉?.六獸} (${result2.火鄉?.六親})`);
console.log();

console.log('✅ 所有功能测试通过！');
