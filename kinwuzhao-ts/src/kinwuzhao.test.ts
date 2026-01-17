import { describe, it, expect } from 'vitest';
import { fiveZhaoPaiPan, ganzhiPaiPan } from './kinwuzhao';
import { ganZhi } from './ganzhi';
import { findCurrentJieQi } from './jieqi';

describe('五兆排盘', () => {
  describe('完整输出测试案例', () => {
    it('应该输出完整的排盘结果（2025年6月27日11时24分）', () => {
      console.log('\n' + '='.repeat(80));
      console.log('📅 五兆排盘完整输出测试');
      console.log('='.repeat(80));

      // 1. 日期时间
      const year = 2025;
      const month = 6;
      const day = 27;
      const hour = 11;
      const minute = 24;

      console.log('\n【起盘信息】');
      console.log(`  公历时间: ${year}年${month}月${day}日 ${hour}时${minute}分`);

      // 2. 获取干支
      const gz = ganZhi(year, month, day, hour, minute);
      console.log('\n【干支信息】');
      console.log(`  年干支: ${gz.year}`);
      console.log(`  月干支: ${gz.month}`);
      console.log(`  日干支: ${gz.day}`);
      console.log(`  时干支: ${gz.hour}`);
      console.log(`  分干支: ${gz.minute}`);

      // 3. 获取节气
      const jq = findCurrentJieQi(year, month, day, hour, minute);
      console.log('\n【节气信息】');
      console.log(`  当前节气: ${jq}`);

      // 4. 干支起盘
      const result = ganzhiPaiPan(gz, 0, jq, '五');
      
      console.log('\n【干支起盘结果】');
      console.log('─'.repeat(80));

      // 定义宫位顺序
      const palaces = [
        { key: '兆', name: '兆宫（巽宫）' },
        { key: '木鄉', name: '木乡（震宫）' },
        { key: '火鄉', name: '火乡（离宫）' },
        { key: '土鄉', name: '土乡（中宫）' },
        { key: '金鄉', name: '金乡（兑宫）' },
        { key: '水鄉', name: '水乡（坎宫）' }
      ];

      palaces.forEach((palace, index) => {
        const data = (result as any)[palace.key];
        if (data) {
          console.log(`\n${index + 1}. ${palace.name}`);
          console.log(`   ├─ 数字: ${data.數字}`);
          console.log(`   ├─ 五行: ${data.五行}`);
          console.log(`   ├─ 六兽: ${data.六獸}${data.六獸死}${data.六獸害}`);
          console.log(`   ├─ 六亲: ${data.六親 || '－'}`);
          console.log(`   ├─ 旺相: ${data.旺相 || '－'}`);
          
          const specials = [];
          if (data.孤) specials.push(data.孤);
          if (data.虛) specials.push(data.虛);
          if (data.關) specials.push(data.關);
          if (data.籥) specials.push(data.籥);
          if (data.將軍) specials.push(data.將軍);
          
          if (specials.length > 0) {
            console.log(`   └─ 特殊: ${specials.join('、')}`);
          } else {
            console.log(`   └─ 特殊: 无`);
          }
        }
      });

      console.log('\n' + '─'.repeat(80));
      
      // 5. 生成格式化表格
      console.log('\n【排盘盘面】');
      console.log('┌─────────────┬─────────────┬─────────────┐');
      
      const formatCell = (key: string) => {
        const data = (result as any)[key];
        if (!data) return '             ';
        const line1 = `${data.宮位}`;
        const line2 = `${data.五行}${data.數字} ${data.六獸}`;
        const line3 = data.六親 ? `(${data.六親})` : '';
        return `${line1.padEnd(6)}${line2.padEnd(5)}${line3}`.padEnd(13);
      };

      console.log(`│${formatCell('兆')}│${formatCell('火鄉')}│             │`);
      console.log('├─────────────┼─────────────┼─────────────┤');
      console.log(`│${formatCell('木鄉')}│${formatCell('土鄉')}│${formatCell('金鄉')}│`);
      console.log('├─────────────┼─────────────┼─────────────┤');
      console.log(`│             │${formatCell('水鄉')}│             │`);
      console.log('└─────────────┴─────────────┴─────────────┘');

      // 6. 断卦提示
      console.log('\n【断卦要点】');
      if (result.兆) {
        console.log(`  • 主卦为: ${result.兆.五行}${result.兆.數字}，属${result.兆.五行}行`);
        console.log(`  • 六兽为: ${result.兆.六獸}，${result.兆.旺相 || '平'}相`);
        
        const palaceData = [result.木鄉, result.火鄉, result.土鄉, result.金鄉, result.水鄉];
        const relations = palaceData
          .filter(p => p && p.六親)
          .map(p => p!.六親);
        
        if (relations.length > 0) {
          console.log(`  • 涉及六亲: ${[...new Set(relations)].join('、')}`);
        }
      }

      console.log('\n' + '='.repeat(80));
      console.log('✅ 完整输出测试完成\n');

      // 断言验证
      expect(result).toBeDefined();
      expect(result.錯誤).toBeUndefined();
      expect(result.兆).toBeDefined();
      expect(result.木鄉).toBeDefined();
      expect(result.火鄉).toBeDefined();
      expect(result.土鄉).toBeDefined();
      expect(result.金鄉).toBeDefined();
      expect(result.水鄉).toBeDefined();
      
      // 验证每个宫位的数字在1-5之间
      palaces.forEach(palace => {
        const data = (result as any)[palace.key];
        if (data) {
          expect(data.數字).toBeGreaterThanOrEqual(1);
          expect(data.數字).toBeLessThanOrEqual(5);
        }
      });
    });

    it('应该输出五兆随机排盘的完整结果（甲子日庚午时）', () => {
      console.log('\n' + '='.repeat(80));
      console.log('🎲 五兆随机分配排盘输出测试');
      console.log('='.repeat(80));

      console.log('\n【起盘信息】');
      console.log('  日干支: 甲子');
      console.log('  时干支: 庚午');
      console.log('  节气: 夏至');
      console.log('  农历月: 五月');
      console.log('  起卦数: 0（随机分配）');

      // 执行随机排盘
      const result = fiveZhaoPaiPan(0, '夏至', '五', '甲子', '庚午');

      console.log('\n【随机排盘结果】');
      console.log('─'.repeat(80));

      const palaces = [
        { key: '兆', name: '兆宫（巽宫）' },
        { key: '木鄉', name: '木乡（震宫）' },
        { key: '火鄉', name: '火乡（离宫）' },
        { key: '土鄉', name: '土乡（中宫）' },
        { key: '金鄉', name: '金乡（兑宫）' },
        { key: '水鄉', name: '水乡（坎宫）' }
      ];

      palaces.forEach((palace, index) => {
        const data = (result as any)[palace.key];
        if (data) {
          console.log(`\n${index + 1}. ${palace.name}`);
          console.log(`   数字: ${data.數字} | 五行: ${data.五行} | 六兽: ${data.六獸}${data.六獸死}${data.六獸害}`);
          if (data.六親) console.log(`   六亲: ${data.六親} | 旺相: ${data.旺相 || '－'}`);
        }
      });

      console.log('\n' + '─'.repeat(80));
      console.log(`\n说明: 每次执行随机排盘，分配的数字可能不同`);
      console.log(`当前兆宫数字为: ${result.兆?.數字}`);
      
      console.log('\n' + '='.repeat(80));
      console.log('✅ 随机排盘输出测试完成\n');

      // 断言验证
      expect(result).toBeDefined();
      expect(result.錯誤).toBeUndefined();
      expect(result.兆?.六獸).toBe('青龍'); // 甲日起青龙
    });
  });

  describe('fiveZhaoPaiPan - 随机分配排盘', () => {
  describe('fiveZhaoPaiPan - 随机分配排盘', () => {
    it('应该能正确执行五兆排盘', () => {
      const result = fiveZhaoPaiPan(0, '夏至', '五', '甲子', '庚午');

      expect(result).toBeDefined();
      expect(result.錯誤).toBeUndefined();
      expect(result.兆).toBeDefined();
      expect(result.木鄉).toBeDefined();
      expect(result.火鄉).toBeDefined();
      expect(result.土鄉).toBeDefined();
      expect(result.金鄉).toBeDefined();
      expect(result.水鄉).toBeDefined();
    });

    it('兆宫应该包含正确的字段', () => {
      const result = fiveZhaoPaiPan(0, '夏至', '五', '甲子', '庚午');

      if (result.兆) {
        expect(result.兆.宮位).toBe('兆');
        expect(result.兆.數字).toBeGreaterThanOrEqual(1);
        expect(result.兆.數字).toBeLessThanOrEqual(5);
        expect(result.兆.五行).toBeDefined();
        expect(result.兆.六獸).toBeDefined();
        expect(result.兆.旺相).toBeDefined();
      }
    });

    it('应该正确分配六兽', () => {
      // 甲日起青龙
      const result = fiveZhaoPaiPan(0, '夏至', '五', '甲子', '庚午');

      if (result.兆) {
        expect(result.兆.六獸).toBe('青龍');
      }
    });

    it('应该正确分配六兽（丙日起朱雀）', () => {
      const result = fiveZhaoPaiPan(0, '夏至', '五', '丙寅', '庚午');

      if (result.兆) {
        expect(result.兆.六獸).toBe('朱雀');
      }
    });

    it('数字应该在1-5之间', () => {
      const result = fiveZhaoPaiPan(0, '夏至', '五', '甲子', '庚午');

      const palaces = [result.兆, result.木鄉, result.火鄉, result.土鄉, result.金鄉, result.水鄉];

      palaces.forEach((palace) => {
        if (palace) {
          expect(palace.數字).toBeGreaterThanOrEqual(1);
          expect(palace.數字).toBeLessThanOrEqual(5);
        }
      });
    });

    it('应该拒绝无效的日干', () => {
      const result = fiveZhaoPaiPan(0, '夏至', '五', '子子', '庚午');

      expect(result.錯誤).toBeDefined();
      expect(result.錯誤).toContain('日干不正確');
    });

    it('多次运行应该产生不同的结果（随机性）', () => {
      const results = Array.from({ length: 10 }, () =>
        fiveZhaoPaiPan(0, '夏至', '五', '甲子', '庚午')
      );

      // 检查至少有一些不同的结果
      const uniqueResults = new Set(
        results.map((r) => (r.兆 ? r.兆.數字 : 0))
      );

      // 由于是随机的，10次运行应该至少有2种不同的结果
      expect(uniqueResults.size).toBeGreaterThan(1);
    });
  });

  describe('ganzhiPaiPan - 干支起盘', () => {
    it('应该能正确执行干支起盘', () => {
      const gz = ganZhi(2025, 6, 27, 11, 24);
      const result = ganzhiPaiPan(gz, 0, '夏至', '五');

      expect(result).toBeDefined();
      expect(result.錯誤).toBeUndefined();
      expect(result.兆).toBeDefined();
      expect(result.木鄉).toBeDefined();
      expect(result.火鄉).toBeDefined();
      expect(result.土鄉).toBeDefined();
      expect(result.金鄉).toBeDefined();
      expect(result.水鄉).toBeDefined();
    });

    it('相同输入应该产生相同结果（确定性）', () => {
      const gz = ganZhi(2025, 6, 27, 11, 24);
      const result1 = ganzhiPaiPan(gz, 0, '夏至', '五');
      const result2 = ganzhiPaiPan(gz, 0, '夏至', '五');

      expect(result1.兆?.數字).toBe(result2.兆?.數字);
      expect(result1.木鄉?.數字).toBe(result2.木鄉?.數字);
      expect(result1.火鄉?.數字).toBe(result2.火鄉?.數字);
    });

    it('不同时间应该产生不同结果', () => {
      const gz1 = ganZhi(2025, 6, 27, 11, 24);
      const gz2 = ganZhi(2025, 6, 28, 11, 24); // 使用不同的日期

      const result1 = ganzhiPaiPan(gz1, 0, '夏至', '五');
      const result2 = ganzhiPaiPan(gz2, 0, '夏至', '五');

      // 不同日期至少应该有一些不同
      const isDifferent =
        result1.兆?.數字 !== result2.兆?.數字 ||
        result1.木鄉?.數字 !== result2.木鄉?.數字 ||
        result1.火鄉?.數字 !== result2.火鄉?.數字 ||
        result1.土鄉?.數字 !== result2.土鄉?.數字 ||
        result1.金鄉?.數字 !== result2.金鄉?.數字 ||
        result1.水鄉?.數字 !== result2.水鄉?.數字;

      expect(isDifferent).toBe(true);
    });

    it('数字参数应该影响结果', () => {
      const gz = ganZhi(2025, 6, 27, 11, 24);
      const result1 = ganzhiPaiPan(gz, 0, '夏至', '五');
      const result2 = ganzhiPaiPan(gz, 9, '夏至', '五'); // 使用更大的数字差异

      // 数字不同应该产生不同的结果
      const isDifferent =
        result1.兆?.數字 !== result2.兆?.數字 ||
        result1.木鄉?.數字 !== result2.木鄉?.數字 ||
        result1.火鄉?.數字 !== result2.火鄉?.數字 ||
        result1.土鄉?.數字 !== result2.土鄉?.數字 ||
        result1.金鄉?.數字 !== result2.金鄉?.數字 ||
        result1.水鄉?.數字 !== result2.水鄉?.數字;

      expect(isDifferent).toBe(true);
    });

    it('所有宫位的数字应该在1-5之间', () => {
      const gz = ganZhi(2025, 6, 27, 11, 24);
      const result = ganzhiPaiPan(gz, 0, '夏至', '五');

      const palaces = [result.兆, result.木鄉, result.火鄉, result.土鄉, result.金鄉, result.水鄉];

      palaces.forEach((palace) => {
        if (palace) {
          expect(palace.數字).toBeGreaterThanOrEqual(1);
          expect(palace.數字).toBeLessThanOrEqual(5);
        }
      });
    });
  });
});
