import { describe, it, expect } from 'vitest';
import { ganzhiPaiPan } from './kinwuzhao';
import { ganZhi } from './ganzhi';
import { findCurrentJieQi } from './jieqi';
import { fiveZhaoPaiPan } from './kinwuzhao';


describe('五兆排盘', () => {
  it('水兆克火时应该显示妻财', () => {
    const result = ganzhiPaiPan(
      {
        year: '甲子',
        month: '甲子',
        day: '甲子',
        hour: '甲子',
        minute: '甲子',
      },
      1,
      '夏至',
      ''
    );

    expect(result.兆?.五行).toBe('水');
    expect(result.金鄉?.五行).toBe('火');
    expect(result.金鄉?.六親).toBe('妻財');
  });

  it('应该输出完整的排盘结果（2025年6月27日11时24分）', () => {
  
   // 获取干支
   const gz = ganZhi(2026, 1, 17, 22, 11);
   console.log(gz);
    
   // 获取节气
   const jq = findCurrentJieQi(2026, 1, 17, 22, 11);
   console.log(jq); // '夏至'
    
   // 五兆排盘
   const result = ganzhiPaiPan(gz,0 ,jq,"");
   console.log(result);
  });
});
