/**
 * 五兆占卜系统 - 工具函数
 */

import { TIAN_GAN, DI_ZHI } from './constants.js';

/**
 * 生成六十甲子
 */
export function generateJiaZi(): string[] {
  const result: string[] = [];
  for (let i = 0; i < 60; i++) {
    result.push(TIAN_GAN[i % 10] + DI_ZHI[i % 12]);
  }
  return result;
}

/**
 * 获取六十甲子
 */
export const JIAZI = generateJiaZi();

/**
 * 旋转数组
 */
export function rotateArray<T>(arr: T[], shift: number): T[] {
  const normalizedShift = shift % arr.length;
  return [...arr.slice(normalizedShift), ...arr.slice(0, normalizedShift)];
}

/**
 * 创建新列表（从指定元素开始）
 */
export function newList<T>(list: T[], element: T): T[] {
  const index = list.indexOf(element);
  if (index === -1) return list;
  return rotateArray(list, index);
}

/**
 * 多键字典查找
 */
export function multiKeyDictGet<K, V>(
  dict: Map<K[], V> | Record<string, V>,
  key: K
): V | undefined {
  if (dict instanceof Map) {
    for (const [keys, value] of dict.entries()) {
      if (keys.includes(key)) {
        return value;
      }
    }
  } else {
    for (const [keysStr, value] of Object.entries(dict)) {
      const keys = keysStr.split(',');
      if (keys.includes(String(key))) {
        return value;
      }
    }
  }
  return undefined;
}

/**
 * 随机分割（返回左边部分）
 */
export function randomSplit(total: number): number {
  if (total <= 1) return 1;
  return Math.floor(Math.random() * (total - 1)) + 1;
}

/**
 * 获取六甲旬
 */
export function getLiuJiaXun(): Map<string[], string> {
  const xunMap = new Map<string[], string>();
  for (let i = 0; i < 6; i++) {
    const startGanZhi = JIAZI[i * 10];
    const xun = JIAZI.slice(i * 10, i * 10 + 10);
    xunMap.set(xun, startGanZhi);
  }
  return xunMap;
}

/**
 * 五鼠遁 - 根据日干支推算时辰干支
 */
export function findLunarHour(dayGanZhi: string): Record<string, string> {
  const fiveRats: Record<string, string> = {
    甲: '甲子',
    己: '甲子',
    乙: '丙子',
    庚: '丙子',
    丙: '戊子',
    辛: '戊子',
    丁: '庚子',
    壬: '庚子',
    戊: '壬子',
    癸: '壬子',
  };

  const dayGan = dayGanZhi[0];
  const startGanZhi = fiveRats[dayGan];
  if (!startGanZhi) return {};

  const hourList = newList(JIAZI, startGanZhi).slice(0, 12);
  const result: Record<string, string> = {};
  DI_ZHI.forEach((zhi, index) => {
    result[zhi] = hourList[index];
  });

  return result;
}

/**
 * 五虎遁 - 根据年干支推算月份干支
 */
export function findLunarMonth(yearGanZhi: string): Record<number, string> {
  const fiveTigers: Record<string, string> = {
    甲: '丙寅',
    己: '丙寅',
    乙: '戊寅',
    庚: '戊寅',
    丙: '庚寅',
    辛: '庚寅',
    丁: '壬寅',
    壬: '壬寅',
    戊: '甲寅',
    癸: '甲寅',
  };

  const yearGan = yearGanZhi[0];
  const startGanZhi = fiveTigers[yearGan];
  if (!startGanZhi) return {};

  const monthList = newList(JIAZI, startGanZhi).slice(0, 12);
  const result: Record<number, string> = {};
  for (let i = 0; i < 12; i++) {
    result[i + 1] = monthList[i];
  }

  return result;
}

/**
 * 五马遁 - 根据子时干支推算刻干支（每10分钟一个干支）
 * 对应Python版本的find_lunar_ke函数
 */
export function findLunarKe(hourGanZhi: string): string[] {
  const fiveHorses: Record<string, string> = {
    丙: '甲午',
    辛: '甲午',
    丁: '丙午',
    壬: '丙午',
    戊: '戊午',
    癸: '戊午',
    甲: '庚午',
    己: '庚午',
    乙: '壬午',
    庚: '壬午',
  };

  const hourGan = hourGanZhi[0];
  const startGanZhi = fiveHorses[hourGan];
  if (!startGanZhi) return JIAZI;

  return newList(JIAZI, startGanZhi);
}

/**
 * 获取干支对应的五行
 */
export function getWuXing(ganOrZhi: string): string {
  const wuXingMap: Record<string, string> = {
    甲: '木',
    乙: '木',
    寅: '木',
    卯: '木',
    震: '木',
    巽: '木',
    丙: '火',
    丁: '火',
    巳: '火',
    午: '火',
    離: '火',
    壬: '水',
    癸: '水',
    亥: '水',
    子: '水',
    坎: '水',
    庚: '金',
    辛: '金',
    申: '金',
    酉: '金',
    乾: '金',
    兌: '金',
    未: '土',
    丑: '土',
    戊: '土',
    己: '土',
    辰: '土',
    戌: '土',
    艮: '土',
    坤: '土',
  };

  return wuXingMap[ganOrZhi] || '';
}

/**
 * 双向映射类
 */
export class BiDict<K, V> {
  private forward = new Map<K, V>();
  private backward = new Map<V, K>();

  set(key: K, value: V): void {
    this.forward.set(key, value);
    this.backward.set(value, key);
  }

  get(key: K): V | undefined {
    return this.forward.get(key);
  }

  getInverse(value: V): K | undefined {
    return this.backward.get(value);
  }

  get inverse() {
    return {
      get: (value: V) => this.getInverse(value),
    };
  }
}
