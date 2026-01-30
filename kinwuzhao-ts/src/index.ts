/**
 * 五兆占卜系统 - TypeScript实现
 * @packageDocumentation
 */

// 导出核心功能
export { ganZhi, getHourZhi, type GanZhiResult } from './ganzhi.js';
export { findCurrentJieQi, findSeason } from './jieqi.js';
export {
  fiveZhaoPaiPan,
  ganzhiPaiPan,
  type WuZhaoPaiPanResult,
  type GongWeiInfo,
} from './kinwuzhao.js';

// 导出工具函数
export {
  generateJiaZi,
  JIAZI,
  rotateArray,
  newList,
  multiKeyDictGet,
  randomSplit,
  getLiuJiaXun,
  findLunarHour,
  findLunarMonth,
  findLunarKe,
  getWuXing,
  BiDict,
} from './utils.js';

// 导出常量
export * from './constants.js';

/**
 * 完整排盘示例
 * @example
 * ```typescript
 * import { ganZhi, findCurrentJieQi, fiveZhaoPaiPan } from 'kinwuzhao';
 * 
 * // 获取干支
 * const gz = ganZhi(2025, 6, 27, 11, 24);
 * console.log(gz); // { year: '乙巳', month: '壬午', day: '甲子', hour: '庚午', minute: '己卯' }
 * 
 * // 获取节气
 * const jq = findCurrentJieQi(2025, 6, 27, 11, 24);
 * console.log(jq); // '夏至'
 * 
 * // 五兆排盘
 * const result = fiveZhaoPaiPan(0, jq, '五', gz.day, gz.hour);
 * console.log(result);
 * ```
 */
