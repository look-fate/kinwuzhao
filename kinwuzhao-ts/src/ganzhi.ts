/**
 * 五兆占卜系统 - 干支计算模块
 * 使用tyme4ts计算天干地支
 */

import { SolarTime } from 'tyme4ts';
import { findLunarKe, JIAZI, newList } from './utils.js';

/**
 * 干支结果
 */
export interface GanZhiResult {
  year: string; // 年干支
  month: string; // 月干支
  day: string; // 日干支
  hour: string; // 时干支
  minute: string; // 分干支
}

/**
 * 将公历日期转换为干支
 * @param year 年
 * @param month 月 (1-12)
 * @param day 日
 * @param hour 时 (0-23)
 * @param minute 分 (0-59)
 * @returns 干支结果
 */
export function ganZhi(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
): GanZhiResult {
  // 处理23点的特殊情况（算作第二天的子时）
  let adjustedYear = year;
  let adjustedMonth = month;
  let adjustedDay = day;
  let adjustedHour = hour;

  if (hour === 23) {
    const nextDay = new Date(year, month - 1, day + 1);
    adjustedYear = nextDay.getFullYear();
    adjustedMonth = nextDay.getMonth() + 1;
    adjustedDay = nextDay.getDate();
    adjustedHour = 0;
  }

  // 使用tyme4ts获取八字
  const solarTime = SolarTime.fromYmdHms(adjustedYear, adjustedMonth, adjustedDay, adjustedHour, minute, 0);
  const lunarHour = solarTime.getLunarHour();
  const eightChar = lunarHour.getEightChar();

  const yearGanZhi = eightChar.getYear().getName();
  const monthGanZhi = eightChar.getMonth().getName();
  const dayGanZhi = eightChar.getDay().getName();
  const hourGanZhi = eightChar.getHour().getName();

  // 计算刻干支（使用五马遁，每10分钟一个干支）
  // 获取当天子时的干支
  const ziSolarTime = SolarTime.fromYmdHms(adjustedYear, adjustedMonth, adjustedDay, 0, 0, 0);
  const ziLunarHour = ziSolarTime.getLunarHour();
  const ziEightChar = ziLunarHour.getEightChar();
  const ziGanZhi = ziEightChar.getHour().getName();
  const minuteGanZhi = getMinuteGanZhi(ziGanZhi, adjustedHour, minute);

  return {
    year: yearGanZhi,
    month: monthGanZhi,
    day: dayGanZhi,
    hour: hourGanZhi,
    minute: minuteGanZhi,
  };
}

/**
 * 根据子时干支和具体时间计算分钟干支（刻干支）
 * 每10分钟对应一个干支，对应Python版本的ke_jiazi_d函数
 */
function getMinuteGanZhi(ziGanZhi: string, hour: number, minute: number): string {
  const keList = findLunarKe(ziGanZhi);

  // 将分钟取整到10分钟（00, 10, 20, 30, 40, 50）
  const roundedMinute = Math.floor(minute / 10) * 10;

  // 计算索引：每小时6个刻，每天144个刻，循环60个干支
  const keIndex = (hour * 6 + Math.floor(roundedMinute / 10)) % 60;

  return keList[keIndex];
}

/**
 * 获取时辰对应的地支
 */
export function getHourZhi(hour: number): string {
  const zhiMap = [
    '子',
    '丑',
    '丑',
    '寅',
    '寅',
    '卯',
    '卯',
    '辰',
    '辰',
    '巳',
    '巳',
    '午',
    '午',
    '未',
    '未',
    '申',
    '申',
    '酉',
    '酉',
    '戌',
    '戌',
    '亥',
    '亥',
    '子',
  ];
  return zhiMap[hour] || '子';
}

/**
 * 生成干支表（用于调试）
 */
export function generateGanZhiTable(startYear: number, endYear: number): void {
  for (let year = startYear; year <= endYear; year++) {
    const result = ganZhi(year, 1, 1, 0, 0);
    console.log(`${year}年: ${result.year} ${result.month} ${result.day} ${result.hour}`);
  }
}
