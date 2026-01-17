import { describe, it, expect } from 'vitest';
import { findCurrentJieQi, findJieQiDate, findSeason, distanceToJieQi } from './jieqi';
import { TWENTY_FOUR_SOLAR_TERMS } from './constants';

describe('节气计算', () => {
  it('应该能找到当前节气', () => {
    const jieqi = findCurrentJieQi(2025, 6, 27, 11, 24);

    expect(jieqi).toBeDefined();
    expect(TWENTY_FOUR_SOLAR_TERMS).toContain(jieqi as any);
  });

  it('应该能找到春分的日期', () => {
    const date = findJieQiDate(2025, '春分');

    expect(date).toBeDefined();
    expect(date).toBeInstanceOf(Date);

    if (date) {
      expect(date.getMonth()).toBe(2); // 3月（0-based）
      expect(date.getDate()).toBeGreaterThanOrEqual(19);
      expect(date.getDate()).toBeLessThanOrEqual(21);
    }
  });

  it('应该能找到夏至的日期', () => {
    const date = findJieQiDate(2025, '夏至');

    expect(date).toBeDefined();
    expect(date).toBeInstanceOf(Date);

    if (date) {
      expect(date.getMonth()).toBe(5); // 6月（0-based）
      expect(date.getDate()).toBeGreaterThanOrEqual(20);
      expect(date.getDate()).toBeLessThanOrEqual(22);
    }
  });

  it('应该能找到冬至的日期', () => {
    const date = findJieQiDate(2025, '冬至');

    expect(date).toBeDefined();
    expect(date).toBeInstanceOf(Date);

    if (date) {
      expect(date.getMonth()).toBe(11); // 12月（0-based）
      expect(date.getDate()).toBeGreaterThanOrEqual(21);
      expect(date.getDate()).toBeLessThanOrEqual(23);
    }
  });

  it('应该正确识别节气对应的季节', () => {
    expect(findSeason('立春')).toBe('春');
    expect(findSeason('春分')).toBe('春');
    expect(findSeason('立夏')).toBe('夏');
    expect(findSeason('夏至')).toBe('夏');
    expect(findSeason('立秋')).toBe('秋');
    expect(findSeason('秋分')).toBe('秋');
    expect(findSeason('立冬')).toBe('冬');
    expect(findSeason('冬至')).toBe('冬');
  });

  it('应该能计算距离节气的天数', () => {
    const distance = distanceToJieQi(2025, 6, 27, '夏至');

    expect(typeof distance).toBe('number');
  });

  it('无效的节气名称应返回null', () => {
    const date = findJieQiDate(2025, '无效节气');

    expect(date).toBeNull();
  });
});
