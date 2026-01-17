/**
 * 五兆占卜系统 - 节气计算模块
 * 负责计算二十四节气
 */

import * as Astronomy from 'astronomy-engine';
import { TWENTY_FOUR_SOLAR_TERMS } from './constants.js';

/**
 * 根据日期查找当前节气
 * @param year 年
 * @param month 月 (1-12)
 * @param day 日
 * @param hour 时 (0-23)
 * @param minute 分 (0-59)
 * @returns 当前节气名称
 */
export function findCurrentJieQi(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
): string {
  const currentDate = new Date(year, month - 1, day, hour, minute);
  const currentTime = currentDate.getTime();

  // 获取前后各3个节气
  const nearbyJieQi = findNearbyJieQi(year, month, day, 3);

  // 找到当前时间所处的节气
  for (let i = 0; i < nearbyJieQi.length - 1; i++) {
    const current = nearbyJieQi[i];
    const next = nearbyJieQi[i + 1];

    if (currentTime >= current.date.getTime() && currentTime < next.date.getTime()) {
      return current.name;
    }
  }

  // 如果没找到，返回最后一个
  return nearbyJieQi[nearbyJieQi.length - 1].name;
}

/**
 * 查找附近的节气
 */
function findNearbyJieQi(
  year: number,
  month: number,
  day: number,
  count: number
): Array<{ name: string; date: Date }> {
  const result: Array<{ name: string; date: Date }> = [];

  // 从前一年开始计算，确保能找到足够的节气
  const startYear = year - 1;

  for (let y = startYear; y <= year + 1; y++) {
    for (let i = 0; i < TWENTY_FOUR_SOLAR_TERMS.length; i++) {
      const jieqiDate = calculateJieQiDate(y, i);
      result.push({
        name: TWENTY_FOUR_SOLAR_TERMS[i],
        date: jieqiDate,
      });
    }
  }

  // 排序
  result.sort((a, b) => a.date.getTime() - b.date.getTime());

  return result;
}

/**
 * 计算特定节气的日期
 * @param year 年份
 * @param jieqiIndex 节气索引 (0-23)
 * @returns 节气日期
 */
function calculateJieQiDate(year: number, jieqiIndex: number): Date {
  // 春分是0度，每个节气相隔15度
  // 立春是315度（春分前45度）
  // 节气对应的黄经：立春315, 雨水330, 惊蛰345, 春分0, 清明15...
  const baseAngle = 315; // 立春的黄经
  const targetLongitude = (baseAngle + jieqiIndex * 15) % 360;

  // 使用Astronomy Engine计算太阳到达指定黄经的时间
  const targetDate = findSolarLongitudeDate(year, targetLongitude);

  return targetDate;
}

/**
 * 查找太阳到达指定黄经的日期
 */
function findSolarLongitudeDate(year: number, targetLongitude: number): Date {
  // 使用Astronomy Engine的SearchSunLongitude函数
  // 从指定年份的1月1日开始搜索
  const startDate = Astronomy.MakeTime(new Date(year, 0, 1));

  try {
    const result = Astronomy.SearchSunLongitude(targetLongitude, startDate, 400);
    if (result && result.date) {
      return result.date;
    }
    // 如果结果为null，返回估算日期
    const jieqiIndex = Math.floor(((targetLongitude - 315 + 360) % 360) / 15);
    const estimatedMonth = Math.floor((jieqiIndex + 1) / 2) + 1;
    const estimatedDay = ((jieqiIndex % 2) * 15) + 5;
    return new Date(year, estimatedMonth - 1, estimatedDay);
  } catch (e) {
    // 如果搜索失败，返回估算日期
    const jieqiIndex = Math.floor(((targetLongitude - 315 + 360) % 360) / 15);
    const estimatedMonth = Math.floor((jieqiIndex + 1) / 2) + 1;
    const estimatedDay = ((jieqiIndex % 2) * 15) + 5;
    return new Date(year, estimatedMonth - 1, estimatedDay);
  }
}

/**
 * 根据节气名称查找日期
 * @param year 年份
 * @param jieqiName 节气名称
 * @returns 节气日期
 */
export function findJieQiDate(year: number, jieqiName: string): Date | null {
  const index = TWENTY_FOUR_SOLAR_TERMS.indexOf(jieqiName as any);
  if (index === -1) return null;

  return calculateJieQiDate(year, index);
}

/**
 * 获取当前时间距离指定节气的天数
 */
export function distanceToJieQi(
  year: number,
  month: number,
  day: number,
  jieqiName: string
): number {
  const currentDate = new Date(year, month - 1, day);
  const jieqiDate = findJieQiDate(year, jieqiName);

  if (!jieqiDate) return 0;

  const diff = currentDate.getTime() - jieqiDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * 根据节气查找季节
 */
export function findSeason(jieqi: string): string {
  const seasons: Record<string, string> = {
    立春: '春',
    雨水: '春',
    驚蟄: '春',
    春分: '春',
    清明: '春',
    穀雨: '春',
    立夏: '夏',
    小滿: '夏',
    芒種: '夏',
    夏至: '夏',
    小暑: '夏',
    大暑: '夏',
    立秋: '秋',
    處暑: '秋',
    白露: '秋',
    秋分: '秋',
    寒露: '秋',
    霜降: '秋',
    立冬: '冬',
    小雪: '冬',
    大雪: '冬',
    冬至: '冬',
    小寒: '冬',
    大寒: '冬',
  };

  return seasons[jieqi] || '';
}
