/**
 * 五兆占卜系统 - 干支计算模块
 * 负责根据公历日期计算天干地支
 */

import { Solar } from 'lunar-typescript';
import { TIAN_GAN, DI_ZHI } from './constants.js';
import { findLunarHour, findLunarMinute, JIAZI, newList } from './utils.js';

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

  // 使用lunar-typescript库获取干支
  const solar = Solar.fromYmdHms(adjustedYear, adjustedMonth, adjustedDay, adjustedHour, minute, 0);
  const lunar = solar.getLunar();

  const yearGanZhi = lunar.getYearInGanZhi();
  const monthGanZhi = lunar.getMonthInGanZhi();
  const dayGanZhi = lunar.getDayInGanZhi();
  const hourGanZhi = lunar.getTimeInGanZhi();

  // 计算分干支（获取当天子时的干支）
  const ziSolar = Solar.fromYmdHms(adjustedYear, adjustedMonth, adjustedDay, 0, 0, 0);
  const ziLunar = ziSolar.getLunar();
  const ziGanZhi = ziLunar.getTimeInGanZhi();
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
 * 根据时辰干支和具体时间计算分钟干支
 */
function getMinuteGanZhi(ziGanZhi: string, hour: number, minute: number): string {
  const minuteList = findLunarMinute(ziGanZhi);

  // 将时间转换为分钟总数
  const totalMinutes = hour * 60 + minute;

  // 每个干支对应2分钟
  const index = Math.floor(totalMinutes / 2) % 60;

  return minuteList[index];
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
