/**
 * 五兆占卜系统 - 基本示例
 */

import { ganZhi, findCurrentJieQi, fiveZhaoPaiPan, ganzhiPaiPan } from '../src/index.js';

// 示例1：获取当前时间的干支
console.log('=== 示例1：干支计算 ===');
const year = 2025;
const month = 6;
const day = 27;
const hour = 11;
const minute = 24;

const gz = ganZhi(year, month, day, hour, minute);
console.log(`${year}年${month}月${day}日 ${hour}时${minute}分`);
console.log('年干支:', gz.year);
console.log('月干支:', gz.month);
console.log('日干支:', gz.day);
console.log('时干支:', gz.hour);
console.log('分干支:', gz.minute);
console.log();

// 示例2：查找当前节气
console.log('=== 示例2：节气计算 ===');
const jq = findCurrentJieQi(year, month, day, hour, minute);
console.log('当前节气:', jq);
console.log();

// 示例3：五兆随机分配排盘
console.log('=== 示例3：五兆随机分配排盘 ===');
const result1 = fiveZhaoPaiPan(0, jq, '五', gz.day, gz.hour);

if (result1.錯誤) {
  console.error('错误:', result1.錯誤);
} else {
  console.log('兆宫（巽宫）:');
  console.log('  数字:', result1.兆?.數字);
  console.log('  五行:', result1.兆?.五行);
  console.log('  六兽:', result1.兆?.六獸);
  console.log('  旺相:', result1.兆?.旺相);
  console.log();

  console.log('木乡（震宫）:');
  console.log('  数字:', result1.木鄉?.數字);
  console.log('  五行:', result1.木鄉?.五行);
  console.log('  六兽:', result1.木鄉?.六獸);
  console.log('  六亲:', result1.木鄉?.六親);
  console.log();
}

// 示例4：干支起盘
console.log('=== 示例4：干支起盘 ===');
const result2 = ganzhiPaiPan(gz, 0, jq, '五');

console.log('完整排盘结果：');
console.log(JSON.stringify(result2, null, 2));
