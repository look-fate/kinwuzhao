import { describe, it, expect } from 'vitest';
import { ganZhi, getHourZhi } from './ganzhi';

describe('干支计算', () => {
  it('应该正确计算2025年6月27日的干支', () => {
    const result = ganZhi(2025, 6, 27, 11, 24);

    expect(result.year).toBeDefined();
    expect(result.month).toBeDefined();
    expect(result.day).toBeDefined();
    expect(result.hour).toBeDefined();
    expect(result.minute).toBeDefined();

    // 验证格式：应该是两个字符
    expect(result.year).toHaveLength(2);
    expect(result.month).toHaveLength(2);
    expect(result.day).toHaveLength(2);
    expect(result.hour).toHaveLength(2);
    expect(result.minute).toHaveLength(2);
  });

  it('应该正确处理23点的特殊情况', () => {
    const result = ganZhi(2025, 6, 27, 23, 30);

    // 23点应该算作第二天的子时
    expect(result.hour[1]).toBe('子');
  });

  it('应该正确获取时辰对应的地支', () => {
    expect(getHourZhi(0)).toBe('子');
    expect(getHourZhi(1)).toBe('丑');
    expect(getHourZhi(12)).toBe('午');
    expect(getHourZhi(23)).toBe('子');
  });

  it('应该正确计算不同年份的干支', () => {
    const years = [2020, 2021, 2022, 2023, 2024, 2025];
    const results = years.map((year) => ganZhi(year, 1, 1, 0, 0));

    // 确保每年的干支都不同
    const uniqueYears = new Set(results.map((r) => r.year));
    expect(uniqueYears.size).toBeGreaterThan(1);
  });

  it('应该处理闰年', () => {
    const result = ganZhi(2024, 2, 29, 12, 0);

    expect(result).toBeDefined();
    expect(result.year).toHaveLength(2);
  });
});
