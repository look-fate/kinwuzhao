/**
 * 五兆占卜系统 - 核心排盘模块
 */

import {
  NUM_TO_ELEMENT,
  SIX_BEASTS,
  DAY_GAN_TO_BEAST,
  SIX_BEAST_WEAKNESS,
  YIN_YANG,
  GU_XU_CONFIG,
  ZHI_TO_GUA,
  GENERAL_MAP,
  WU_XING_RELATION,
  LIU_QIN_MAP,
  GONG_WEI,
  GONG_WEI_LABELS,
  BA_GUA,
  WANG_XIANG,
  JIEQI_GROUPS,
} from './constants.js';
import { randomSplit, BiDict, getWuXing, JIAZI, rotateArray } from './utils.js';
import { GanZhiResult } from './ganzhi.js';

/**
 * 宫位信息
 */
export interface GongWeiInfo {
  宮位: string; // 宫位名称
  宮位1: string; // 宫位八卦
  旺相: string; // 旺相状态
  數字: number; // 数字(1-5)
  五行: string; // 五行
  六獸: string; // 六兽
  六獸死: string; // 六兽死
  六獸害: string; // 六兽害
  六親: string; // 六亲
  孤: string; // 孤
  虛: string; // 虚
  關: string; // 关
  籥: string; // 钥
  將軍: string; // 将军
}

/**
 * 五兆排盘结果
 */
export interface WuZhaoPaiPanResult {
  兆?: GongWeiInfo;
  木鄉?: GongWeiInfo;
  火鄉?: GongWeiInfo;
  土鄉?: GongWeiInfo;
  金鄉?: GongWeiInfo;
  水鄉?: GongWeiInfo;
  錯誤?: string;
}

/**
 * 节气旺相配置
 */
function buildJieQiWangXiang(): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};

  JIEQI_GROUPS.forEach((group, index) => {
    const rotated = rotateArray(BA_GUA as unknown as string[], index);
    const mapping: Record<string, string> = {};
    rotated.forEach((gua, i) => {
      mapping[gua] = WANG_XIANG[i];
    });

    group.forEach((jieqi) => {
      result[jieqi] = mapping;
    });
  });

  return result;
}

const JIEQI_WANG_XIANG = buildJieQiWangXiang();

/**
 * 四季关籥配置
 */
const SOLAR_TERMS_BY_SEASON: Array<{ terms: string[]; guan: string; yue: string }> = [
  { terms: ['立春', '雨水', '驚蟄', '春分', '清明', '穀雨'], guan: '丑', yue: '巳' },
  { terms: ['立夏', '小滿', '芒種', '夏至', '小暑', '大暑'], guan: '辰', yue: '申' },
  { terms: ['立秋', '處暑', '白露', '秋分', '寒露', '霜降'], guan: '未', yue: '亥' },
  { terms: ['立冬', '小雪', '大雪', '冬至', '小寒', '大寒'], guan: '戌', yue: '寅' },
];

/**
 * 根据节气获取关籥
 */
function getGuanYue(jieqi: string): { 關: string; 籥: string } | null {
  for (const season of SOLAR_TERMS_BY_SEASON) {
    if (season.terms.includes(jieqi)) {
      return { 關: season.guan, 籥: season.yue };
    }
  }
  return null;
}

/**
 * 五兆随机分配排盘
 * @param num 起卦数字
 * @param jq 节气
 * @param cm 农历月
 * @param gz1 干支1（用于配六兽）
 * @param gz2 干支2（时辰干支，用于孤虚）
 * @param liurenData 六壬数据（地转天盘）
 * @returns 五兆排盘结果
 */
export function fiveZhaoPaiPan(
  num: number,
  jq: string,
  cm: string,
  gz1: string,
  gz2: string,
  liurenData?: Record<string, string>
): WuZhaoPaiPanResult {
  const dayGan = gz1[0];

  // 验证日干
  if (!(dayGan in DAY_GAN_TO_BEAST)) {
    return { 錯誤: '日干不正確，請輸入：甲乙丙丁戊己庚辛壬癸' };
  }

  const base = 36;
  const result: WuZhaoPaiPanResult = {};

  // 确定六兽序列
  const beastStart = DAY_GAN_TO_BEAST[dayGan];
  const startIndex = SIX_BEASTS.indexOf(beastStart as any);
  const beastSeq = Array.from({ length: 6 }, (_, i) => SIX_BEASTS[(startIndex + i) % 6]);

  // 准备地转天盘（如果提供了六壬数据）
  const sky2earth = new BiDict<string, string>();
  if (liurenData) {
    Object.entries(liurenData).forEach(([key, value]) => {
      sky2earth.set(key, value);
    });
  }

  // 获取关籥
  const guanYue = getGuanYue(jq);
  let lock = '';
  let key = '';
  let general = '';

  if (guanYue && liurenData) {
    const guanZhi = sky2earth.getInverse(guanYue.關) || guanYue.關;
    const yueZhi = sky2earth.getInverse(guanYue.籥) || guanYue.籥;
    lock = ZHI_TO_GUA[guanZhi] || '';
    key = ZHI_TO_GUA[yueZhi] || '';

    const generalZhi = GENERAL_MAP[gz2[1]] || gz2[1];
    const generalMapped = sky2earth.getInverse(generalZhi) || generalZhi;
    general = ZHI_TO_GUA[generalMapped] || '';
  }

  // 获取孤虚
  const gz2Index = Math.floor(JIAZI.indexOf(gz2) / 10);
  const guxuConfig = GU_XU_CONFIG[gz2Index];
  const yinYang = YIN_YANG[gz2[0]];
  const gu = guxuConfig[yinYang].孤;
  const xu = guxuConfig[yinYang].虛;
  const guGua = ZHI_TO_GUA[gu] || '';
  const xuGua = ZHI_TO_GUA[xu] || '';

  // 宫位配置
  const positions: Array<[string, string]> = [
    ['巽宮', '兆'],
    ['震宮', '木鄉'],
    ['離宮', '火鄉'],
    ['中宮', '土鄉'],
    ['兌宮', '金鄉'],
    ['坎宮', '水鄉'],
  ];

  let remain = base;
  let myElement = '';

  for (let idx = 0; idx < positions.length; idx++) {
    const [gong, label] = positions[idx];
    const left = randomSplit(remain);
    let zhaoNum = left % 5;
    zhaoNum = zhaoNum === 0 ? 5 : zhaoNum;
    const zhaoElement = NUM_TO_ELEMENT[zhaoNum];
    const beast = beastSeq[idx];

    const gongGua = gong[0] === '中' ? '坤' : gong[0];

    // 计算六亲
    let relation = '';
    if (idx === 0) {
      myElement = zhaoElement;
    } else {
      const relationKey = myElement + zhaoElement;
      const wuxingRelation = WU_XING_RELATION[relationKey] || '';
      relation = LIU_QIN_MAP[wuxingRelation] || '';
    }

    // 获取旺相
    const wangxiang = JIEQI_WANG_XIANG[jq]?.[gongGua] || '';

    // 六兽死害
    const weakness = SIX_BEAST_WEAKNESS[beast];
    const sixBeastDeath = weakness && weakness[0][0] === gongGua ? '死' : '';
    const sixBeastHarm = weakness && weakness[1][0] === gongGua ? '害' : '';

    (result as any)[label] = {
      宮位: label,
      宮位1: gongGua,
      旺相: wangxiang,
      數字: zhaoNum,
      五行: zhaoElement,
      六獸: beast,
      六獸死: sixBeastDeath,
      六獸害: sixBeastHarm,
      六親: relation,
      孤: guGua === gongGua ? '孤' : '',
      虛: xuGua === gongGua ? '虛' : '',
      關: lock === gongGua ? '關' : '',
      籥: key === gongGua ? '籥' : '',
      將軍: general === gongGua ? '將軍' : '',
    };

    remain -= zhaoNum;
    if (remain <= 0) break;
  }

  return result;
}

/**
 * 干支起盘（根据年月日时分干支计算）
 * @param gzList 干支列表 [年, 月, 日, 时, 分]
 * @param num 额外数字
 * @param jq 节气
 * @param cm 农历月
 * @param liurenData 六壬数据
 * @returns 五兆排盘结果
 */
export function ganzhiPaiPan(
  gzList: GanZhiResult,
  num: number,
  jq: string,
  cm: string,
  liurenData?: Record<string, string>
): WuZhaoPaiPanResult {
  const { year, month, day, hour, minute } = gzList;

  // 验证分钟干支的天干（Python版本使用mi[0]）
  const minuteGan = minute[0];
  if (!(minuteGan in DAY_GAN_TO_BEAST)) {
    return { 錯誤: '日干不正確，請輸入：甲乙丙丁戊己庚辛壬癸' };
  }

  // 甲子序号映射
  const jz2num: Record<string, number> = {};
  JIAZI.forEach((gz, index) => {
    jz2num[gz] = index + 1;
  });

  // 确定六兽序列（使用分钟干支的天干）
  const beastStart = DAY_GAN_TO_BEAST[minuteGan];
  const startIndex = SIX_BEASTS.indexOf(beastStart as any);
  const beastSeq = Array.from({ length: 6 }, (_, i) => SIX_BEASTS[(startIndex + i) % 6]);

  // 准备地转天盘
  const sky2earth = new BiDict<string, string>();
  if (liurenData) {
    Object.entries(liurenData).forEach(([key, value]) => {
      sky2earth.set(key, value);
    });
  }

  // 获取关籥
  const guanYue = getGuanYue(jq);
  let lock = '';
  let key = '';
  let general = '';

  if (guanYue && liurenData) {
    const guanZhi = sky2earth.getInverse(guanYue.關) || guanYue.關;
    const yueZhi = sky2earth.getInverse(guanYue.籥) || guanYue.籥;
    lock = ZHI_TO_GUA[guanZhi] || '';
    key = ZHI_TO_GUA[yueZhi] || '';

    const generalZhi = GENERAL_MAP[minute[1]] || minute[1];
    const generalMapped = sky2earth.getInverse(generalZhi) || generalZhi;
    general = ZHI_TO_GUA[generalMapped] || '';
  }

  // 获取孤虚
  const minuteIndex = Math.floor(JIAZI.indexOf(minute) / 10);
  const guxuConfig = GU_XU_CONFIG[minuteIndex];
  const yinYang = YIN_YANG[minute[0]];
  const gu = guxuConfig[yinYang].孤;
  const xu = guxuConfig[yinYang].虛;
  const guGua = ZHI_TO_GUA[gu] || '';
  const xuGua = ZHI_TO_GUA[xu] || '';

  // 宫位配置（每个宫位使用不同的干支组合）
  const positions: Array<[string, string, string[]]> = [
    ['巽宮', '兆', [year, month, day, hour, minute]],
    ['震宮', '木鄉', [month, day, hour, minute]],
    ['離宮', '火鄉', [day, hour, minute]],
    ['中宮', '土鄉', [hour, minute]],
    ['兌宮', '金鄉', [minute]],
    ['坎宮', '水鄉', []],
  ];

  const result: WuZhaoPaiPanResult = {};
  let myElement = '';

  for (let idx = 0; idx < positions.length; idx++) {
    const [gong, label, parts] = positions[idx];

    // 计算总数
    let total = num;
    for (const part of parts) {
      total += jz2num[part] || (typeof part === 'number' ? part : 0);
    }

    let zhaoNum = total % 5;
    zhaoNum = zhaoNum === 0 ? 5 : zhaoNum;
    const zhaoElement = NUM_TO_ELEMENT[zhaoNum];
    const beast = beastSeq[idx];

    const gongGua = gong[0] === '中' ? '坤' : gong[0];

    // 计算六亲
    let relation = '';
    if (idx === 0) {
      myElement = zhaoElement;
    } else {
      const relationKey = myElement + zhaoElement;
      const wuxingRelation = WU_XING_RELATION[relationKey] || '';
      relation = LIU_QIN_MAP[wuxingRelation] || '';
    }

    // 获取旺相
    const wangxiang = JIEQI_WANG_XIANG[jq]?.[gongGua] || '';

    // 六兽死害
    const weakness = SIX_BEAST_WEAKNESS[beast];
    const sixBeastDeath = weakness && weakness[0][0] === gongGua ? '死' : '';
    const sixBeastHarm = weakness && weakness[1][0] === gongGua ? '害' : '';

    (result as any)[label] = {
      宮位: label,
      宮位1: gongGua,
      旺相: wangxiang,
      數字: zhaoNum,
      五行: zhaoElement,
      六獸: beast,
      六獸死: sixBeastDeath,
      六獸害: sixBeastHarm,
      六親: relation,
      關: lock === gongGua ? '關' : '',
      籥: key === gongGua ? '籥' : '',
      孤: guGua === gongGua ? '孤' : '',
      虛: xuGua === gongGua ? '虛' : '',
      將軍: general === gongGua ? '將軍' : '',
    };
  }

  return result;
}
