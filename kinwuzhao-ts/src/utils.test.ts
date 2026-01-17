import { describe, it, expect } from 'vitest';
import {
  generateJiaZi,
  JIAZI,
  rotateArray,
  newList,
  randomSplit,
  findLunarHour,
  findLunarMonth,
  getWuXing,
  BiDict,
} from './utils';

describe('工具函数', () => {
  describe('generateJiaZi', () => {
    it('应该生成60个甲子', () => {
      const jiazi = generateJiaZi();

      expect(jiazi).toHaveLength(60);
      expect(jiazi[0]).toBe('甲子');
      expect(jiazi[59]).toBe('癸亥');
    });

    it('JIAZI常量应该包含60个元素', () => {
      expect(JIAZI).toHaveLength(60);
    });
  });

  describe('rotateArray', () => {
    it('应该正确旋转数组', () => {
      const arr = [1, 2, 3, 4, 5];
      const rotated = rotateArray(arr, 2);

      expect(rotated).toEqual([3, 4, 5, 1, 2]);
    });

    it('旋转0位应该返回相同数组', () => {
      const arr = [1, 2, 3, 4, 5];
      const rotated = rotateArray(arr, 0);

      expect(rotated).toEqual(arr);
    });

    it('应该处理超过数组长度的旋转', () => {
      const arr = [1, 2, 3, 4, 5];
      const rotated = rotateArray(arr, 7); // 7 % 5 = 2

      expect(rotated).toEqual([3, 4, 5, 1, 2]);
    });
  });

  describe('newList', () => {
    it('应该从指定元素开始重排列表', () => {
      const list = ['a', 'b', 'c', 'd', 'e'];
      const result = newList(list, 'c');

      expect(result).toEqual(['c', 'd', 'e', 'a', 'b']);
    });

    it('如果元素不存在应该返回原列表', () => {
      const list = ['a', 'b', 'c', 'd', 'e'];
      const result = newList(list, 'z' as any);

      expect(result).toEqual(list);
    });
  });

  describe('randomSplit', () => {
    it('当总数<=1时应该返回1', () => {
      expect(randomSplit(1)).toBe(1);
      expect(randomSplit(0)).toBe(1);
    });

    it('应该返回1到total-1之间的随机数', () => {
      const results = Array.from({ length: 100 }, () => randomSplit(10));

      results.forEach((result) => {
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThan(10);
      });
    });

    it('多次运行应该产生不同的结果', () => {
      const results = Array.from({ length: 20 }, () => randomSplit(10));
      const uniqueResults = new Set(results);

      // 20次运行应该至少有2种不同的结果
      expect(uniqueResults.size).toBeGreaterThan(1);
    });
  });

  describe('findLunarHour', () => {
    it('应该返回12个时辰干支', () => {
      const result = findLunarHour('甲子');

      expect(Object.keys(result)).toHaveLength(12);
    });

    it('甲日子时应该是甲子', () => {
      const result = findLunarHour('甲子');

      expect(result['子']).toBe('甲子');
    });

    it('乙日子时应该是丙子', () => {
      const result = findLunarHour('乙丑');

      expect(result['子']).toBe('丙子');
    });
  });

  describe('findLunarMonth', () => {
    it('应该返回12个月份干支', () => {
      const result = findLunarMonth('甲子');

      expect(Object.keys(result)).toHaveLength(12);
    });

    it('甲年正月应该是丙寅', () => {
      const result = findLunarMonth('甲子');

      expect(result[1]).toBe('丙寅');
    });
  });

  describe('getWuXing', () => {
    it('应该正确识别天干的五行', () => {
      expect(getWuXing('甲')).toBe('木');
      expect(getWuXing('乙')).toBe('木');
      expect(getWuXing('丙')).toBe('火');
      expect(getWuXing('丁')).toBe('火');
      expect(getWuXing('戊')).toBe('土');
      expect(getWuXing('己')).toBe('土');
      expect(getWuXing('庚')).toBe('金');
      expect(getWuXing('辛')).toBe('金');
      expect(getWuXing('壬')).toBe('水');
      expect(getWuXing('癸')).toBe('水');
    });

    it('应该正确识别地支的五行', () => {
      expect(getWuXing('子')).toBe('水');
      expect(getWuXing('丑')).toBe('土');
      expect(getWuXing('寅')).toBe('木');
      expect(getWuXing('卯')).toBe('木');
      expect(getWuXing('辰')).toBe('土');
      expect(getWuXing('巳')).toBe('火');
      expect(getWuXing('午')).toBe('火');
      expect(getWuXing('未')).toBe('土');
      expect(getWuXing('申')).toBe('金');
      expect(getWuXing('酉')).toBe('金');
      expect(getWuXing('戌')).toBe('土');
      expect(getWuXing('亥')).toBe('水');
    });

    it('无效字符应该返回空字符串', () => {
      expect(getWuXing('无效')).toBe('');
    });
  });

  describe('BiDict', () => {
    it('应该能正向查找', () => {
      const bidict = new BiDict<string, number>();
      bidict.set('甲', 1);
      bidict.set('乙', 2);

      expect(bidict.get('甲')).toBe(1);
      expect(bidict.get('乙')).toBe(2);
    });

    it('应该能反向查找', () => {
      const bidict = new BiDict<string, number>();
      bidict.set('甲', 1);
      bidict.set('乙', 2);

      expect(bidict.getInverse(1)).toBe('甲');
      expect(bidict.getInverse(2)).toBe('乙');
    });

    it('应该能通过inverse属性反向查找', () => {
      const bidict = new BiDict<string, number>();
      bidict.set('甲', 1);

      expect(bidict.inverse.get(1)).toBe('甲');
    });

    it('不存在的键应该返回undefined', () => {
      const bidict = new BiDict<string, number>();
      bidict.set('甲', 1);

      expect(bidict.get('乙')).toBeUndefined();
      expect(bidict.getInverse(2)).toBeUndefined();
    });
  });
});
