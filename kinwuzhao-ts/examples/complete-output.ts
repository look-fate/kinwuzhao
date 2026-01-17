/**
 * 五兆占卜系统 - 完整输出示例
 * 展示详细的排盘过程和结果
 */

import { ganZhi, findCurrentJieQi, ganzhiPaiPan, fiveZhaoPaiPan } from '../dist/index.js';

console.log('\n' + '='.repeat(100));
console.log('📅 五兆排盘完整输出示例');
console.log('='.repeat(100));

// ========== 示例1: 干支起盘（确定性） ==========
console.log('\n\n【示例1：干支起盘（2025年6月27日11时24分）】');
console.log('─'.repeat(100));

// 1. 日期时间
const year = 2025;
const month = 6;
const day = 27;
const hour = 11;
const minute = 24;

console.log('\n▸ 起盘信息');
console.log(`  公历时间: ${year}年${month}月${day}日 ${hour}时${minute}分`);

// 2. 获取干支
const gz = ganZhi(year, month, day, hour, minute);
console.log('\n▸ 干支信息');
console.log(`  年干支: ${gz.year}  (${year}年)`);
console.log(`  月干支: ${gz.month}  (${month}月)`);
console.log(`  日干支: ${gz.day}  (${day}日)`);
console.log(`  时干支: ${gz.hour}  (${hour}时)`);
console.log(`  分干支: ${gz.minute}  (${minute}分)`);

// 3. 获取节气
const jq = findCurrentJieQi(year, month, day, hour, minute);
console.log('\n▸ 节气信息');
console.log(`  当前节气: ${jq}`);

// 4. 干支起盘
const result = ganzhiPaiPan(gz, 0, jq, '五');

console.log('\n▸ 干支起盘结果');
console.log('┄'.repeat(100));

// 定义宫位顺序
const palaces = [
  { key: '兆', name: '兆宫（巽宫）', emoji: '🌟' },
  { key: '木鄉', name: '木乡（震宫）', emoji: '🌳' },
  { key: '火鄉', name: '火乡（离宫）', emoji: '🔥' },
  { key: '土鄉', name: '土乡（中宫）', emoji: '⛰️' },
  { key: '金鄉', name: '金乡（兑宫）', emoji: '⚔️' },
  { key: '水鄉', name: '水乡（坎宫）', emoji: '💧' }
];

palaces.forEach((palace, index) => {
  const data = (result as any)[palace.key];
  if (data) {
    console.log(`\n${palace.emoji} ${index + 1}. ${palace.name}`);
    console.log(`   ├─ 数字: ${data.數字}`);
    console.log(`   ├─ 五行: ${data.五行}`);
    console.log(`   ├─ 六兽: ${data.六獸}${data.六獸死 ? '(死)' : ''}${data.六獸害 ? '(害)' : ''}`);
    console.log(`   ├─ 六亲: ${data.六親 || '－'}`);
    console.log(`   ├─ 旺相: ${data.旺相 || '－'}`);
    
    const specials = [];
    if (data.孤) specials.push(data.孤);
    if (data.虛) specials.push(data.虛);
    if (data.關) specials.push(data.關);
    if (data.籥) specials.push(data.籥);
    if (data.將軍) specials.push(data.將軍);
    
    if (specials.length > 0) {
      console.log(`   └─ 特殊标记: ${specials.join('、')}`);
    } else {
      console.log(`   └─ 特殊标记: 无`);
    }
  }
});

console.log('\n' + '┄'.repeat(100));

// 5. 生成格式化盘面
console.log('\n▸ 排盘盘面');
console.log('┌─────────────────┬─────────────────┬─────────────────┐');

const formatCell = (key: string) => {
  const data = (result as any)[key];
  if (!data) return '                 ';
  const line1 = `${data.宮位}`.padEnd(4);
  const line2 = `${data.五行}${data.數字} ${data.六獸}`.padEnd(10);
  const line3 = data.六親 ? `(${data.六親})` : '';
  return `${line1} ${line2}${line3}`.padEnd(17);
};

console.log(`│${formatCell('兆')}│${formatCell('火鄉')}│                 │`);
console.log('├─────────────────┼─────────────────┼─────────────────┤');
console.log(`│${formatCell('木鄉')}│${formatCell('土鄉')}│${formatCell('金鄉')}│`);
console.log('├─────────────────┼─────────────────┼─────────────────┤');
console.log(`│                 │${formatCell('水鄉')}│                 │`);
console.log('└─────────────────┴─────────────────┴─────────────────┘');

// 6. 断卦提示
console.log('\n▸ 断卦要点');
if (result.兆) {
  console.log(`  • 主卦: ${result.兆.五行}${result.兆.數字}，五行属${result.兆.五行}`);
  console.log(`  • 六兽: ${result.兆.六獸}，状态为${result.兆.旺相 || '平'}相`);
  
  const palaceData = [result.木鄉, result.火鄉, result.土鄉, result.金鄉, result.水鄉];
  const relations = palaceData
    .filter(p => p && p.六親)
    .map(p => p!.六親);
  
  if (relations.length > 0) {
    const uniqueRelations = [...new Set(relations)];
    console.log(`  • 涉及六亲: ${uniqueRelations.join('、')}`);
  }
  
  // 五行统计
  const allData = [result.兆, ...palaceData];
  const elements = allData.filter(p => p).map(p => p!.五行);
  const elementCount: Record<string, number> = {};
  elements.forEach(e => {
    elementCount[e] = (elementCount[e] || 0) + 1;
  });
  
  console.log(`  • 五行分布: ${Object.entries(elementCount).map(([e, c]) => `${e}(${c})`).join('、')}`);
}

// ========== 示例2: 随机分配排盘 ==========
console.log('\n\n' + '─'.repeat(100));
console.log('【示例2：五兆随机分配排盘（甲子日庚午时）】');
console.log('─'.repeat(100));

console.log('\n▸ 起盘信息');
console.log('  日干支: 甲子');
console.log('  时干支: 庚午');
console.log('  节气: 夏至');
console.log('  农历月: 五月');
console.log('  起卦数: 0（随机分配36个竹签）');

// 执行随机排盘
console.log('\n▸ 执行随机排盘（每次结果可能不同）');
const randomResult = fiveZhaoPaiPan(0, '夏至', '五', '甲子', '庚午');

console.log('┄'.repeat(100));

palaces.forEach((palace, index) => {
  const data = (randomResult as any)[palace.key];
  if (data) {
    console.log(`\n${palace.emoji} ${index + 1}. ${palace.name}`);
    console.log(`   数字: ${data.數字} | 五行: ${data.五行} | 六兽: ${data.六獸}${data.六獸死 ? '(死)' : ''}${data.六獸害 ? '(害)' : ''} | 六亲: ${data.六親 || '－'}`);
  }
});

console.log('\n' + '┄'.repeat(100));

console.log('\n▸ 说明');
console.log('  随机分配模式每次执行结果不同，模拟实际占卜中的随机性');
console.log(`  本次兆宫数字为: ${randomResult.兆?.數字}`);
console.log(`  六兽起始: ${randomResult.兆?.六獸}（甲日起青龙）`);

// ========== 示例3: 多次随机排盘对比 ==========
console.log('\n\n' + '─'.repeat(100));
console.log('【示例3：多次随机排盘对比（展示随机性）】');
console.log('─'.repeat(100));

console.log('\n连续执行5次随机排盘，观察兆宫数字的变化：\n');

for (let i = 1; i <= 5; i++) {
  const r = fiveZhaoPaiPan(0, '夏至', '五', '甲子', '庚午');
  console.log(`第${i}次: 兆宫 = ${r.兆?.五行}${r.兆?.數字}  |  木乡 = ${r.木鄉?.五行}${r.木鄉?.數字}  |  火乡 = ${r.火鄉?.五行}${r.火鄉?.數字}  |  土乡 = ${r.土鄉?.五行}${r.土鄉?.數字}  |  金乡 = ${r.金鄉?.五行}${r.金鄉?.數字}  |  水乡 = ${r.水鄉?.五行}${r.水鄉?.數字 || '－'}`);
}

// ========== 示例4: 不同时间对比 ==========
console.log('\n\n' + '─'.repeat(100));
console.log('【示例4：不同时间点的排盘对比】');
console.log('─'.repeat(100));

const times = [
  { year: 2025, month: 3, day: 20, hour: 12, minute: 0, desc: '春分' },
  { year: 2025, month: 6, day: 21, hour: 12, minute: 0, desc: '夏至' },
  { year: 2025, month: 9, day: 23, hour: 12, minute: 0, desc: '秋分' },
  { year: 2025, month: 12, day: 21, hour: 12, minute: 0, desc: '冬至' },
];

console.log('\n对比四季节气时刻的排盘结果：\n');

times.forEach(({ year, month, day, hour, minute, desc }) => {
  const gz = ganZhi(year, month, day, hour, minute);
  const jq = findCurrentJieQi(year, month, day, hour, minute);
  const result = ganzhiPaiPan(gz, 0, jq, '五');

  console.log(`${desc}时刻 (${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}):`);
  console.log(`  节气: ${jq.padEnd(4)} | 日干支: ${gz.day.padEnd(4)} | 兆宫: ${result.兆?.五行}${result.兆?.數字} ${result.兆?.六獸} (${result.兆?.旺相}) | 木乡: ${result.木鄉?.五行}${result.木鄉?.數字} (${result.木鄉?.六親})`);
});

// ========== 总结 ==========
console.log('\n\n' + '='.repeat(100));
console.log('✅ 完整输出示例展示完成');
console.log('='.repeat(100));

console.log('\n📚 说明:');
console.log('  1. 干支起盘: 基于具体时间干支计算，结果确定');
console.log('  2. 随机排盘: 模拟实际占卜的随机分配过程');
console.log('  3. 六兽配置: 根据日干确定起始六兽（甲乙青龙、丙丁朱雀...）');
console.log('  4. 旺相状态: 根据节气和宫位确定五行旺衰');
console.log('  5. 六亲关系: 以兆宫五行为我，推算其他宫位与我的关系\n');
