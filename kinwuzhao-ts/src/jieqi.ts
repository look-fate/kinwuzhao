/**
 * 五兆占卜系统 - 节气计算模块
 * 使用tyme4ts计算二十四节气
 */

import { SolarTime } from 'tyme4ts';

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
  const solarTime = SolarTime.fromYmdHms(year, month, day, hour, minute, 0);
  const term = solarTime.getTerm();
  return term.getName();
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
