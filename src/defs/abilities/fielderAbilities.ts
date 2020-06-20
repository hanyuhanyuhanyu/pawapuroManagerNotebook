import {
  basicPitcherAbilityNames,
  BasicPitcherAbilityNames,
  integer,
  toggle,
  feature,
  Ability,
  chance,
  vsLeftyPitcher,
  catcherLead,
  stealing,
  baseRunning,
  throwing,
  goldOnly,
} from "./commonType";

export const elevation = "elevation";
export const meet = "meet";
export const power = "power";
export const sprint = "sprint";
export const fielding = "fielding";
export const arm = "arm";
export const catching = "catching";
export type BasicFielderAbilityNames =
  | typeof elevation
  | typeof meet
  | typeof power
  | typeof sprint
  | typeof fielding
  | typeof arm
  | typeof catching;
export const basicFielderAbilityNamesExceptElevation: BasicFielderAbilityNames[] = [
  meet,
  power,
  sprint,
  fielding,
  arm,
  catching,
];
export const basicFielderAbilityNames: BasicFielderAbilityNames[] = [
  elevation,
  ...basicFielderAbilityNamesExceptElevation,
];
export function isBasicFielderAbilityNames(
  s: string
): s is BasicFielderAbilityNames {
  return basicFielderAbilityNames.includes(s as BasicFielderAbilityNames);
}

export type BasicFielderSpecialAbilityNames =
  | typeof chance
  | typeof vsLeftyPitcher
  | typeof catcherLead
  | typeof stealing
  | typeof baseRunning
  | typeof throwing;
export const basicFielderSpecialAbilityNames: BasicFielderSpecialAbilityNames[] = [
  chance,
  vsLeftyPitcher,
  catcherLead,
  stealing,
  baseRunning,
  throwing,
];
export function isBasicFielderSpecialAbilityNames(
  s: string
): s is BasicFielderSpecialAbilityNames {
  return basicFielderSpecialAbilityNames.includes(
    s as BasicFielderSpecialAbilityNames
  );
}
export const powerHitter = "powerHitter";
export const averageHitter = "averageHitter";
export const outCourseHitter = "outCourseHitter";
export const fall = "fall"; // 秋男
export const badBallHitter = "badBallHitter";
export const inCourseHitter = "inCourseHitter";
export const unexpected = "unexpected"; // 意外性
export const oxidizedSilver = "oxidizedSilver"; // いぶし銀。直訳
export const error = "error";
export const festival = "festival";
export const disturbance = "disturbance";
export const converge = "converge"; // 固め打ち。収束する
export const adversity = "adversity"; // 逆境
export const wideRange = "wideRange"; // 広角打法
export const SAYONARA = "SAYONARA"; // good-bye man
export const strikeOuter = "strikeOuter";
export const fieldingExpert = "fieldingExpert";
export const encounter = "encounter"; // 出会い頭。初球○
export const vsAce = "vsAce";
export const pinchHitter = "pinchHitter";
export const vsBreakingBall = "vsBreakingBall";
export const doubleSure = "doubleSure"; // ダメ押し
export const chanceMaker = "chanceMaker";
export const infieldHitter = "infieldHitter";
export const lightStroke = "lightStroke"; // 流し打ち
export const summer = "summer";
export const insistent = "insistent"; // 粘り打ち。しつこい
export const highBallHitter = "highBallHitter";
export const spring = "spring";
export const bant = "bant";
export const pullHitter = "pullHitter";
export const pressureRun = "pressureRun";
export const doublePlay = "doublePlay";
export const headSliding = "headSliding";
export const homeBaseGuardian = "homeBaseGuardian";
export const homeBaseAssaulter = "homeBaseAssaulter";
export const laserBeam = "laserBeam";
export const lowBallHitter = "lowBallHitter";
export const fullBase = "fullBase";
export const whisper = "whisper";
export const bazooka = "bazooka";
export const fearfullBatter = "fearfullBatter";
export type FielderTogglableAbilityNames =
  | typeof powerHitter
  | typeof averageHitter
  | typeof outCourseHitter
  | typeof fall // 秋男
  | typeof badBallHitter
  | typeof inCourseHitter
  | typeof unexpected // 意外性
  | typeof oxidizedSilver // いぶし銀。直訳
  | typeof error
  | typeof festival
  | typeof disturbance
  | typeof converge // 固め打ち。収束する
  | typeof adversity // 逆境
  | typeof wideRange // 広角打法
  | typeof SAYONARA // good-bye man
  | typeof strikeOuter
  | typeof fieldingExpert
  | typeof encounter // 出会い頭。初球○
  | typeof vsAce
  | typeof pinchHitter
  | typeof vsBreakingBall
  | typeof doubleSure // ダメ押し
  | typeof chanceMaker
  | typeof infieldHitter
  | typeof lightStroke // 流し打ち
  | typeof summer
  | typeof insistent // 粘り打ち。しつこい
  | typeof highBallHitter
  | typeof spring
  | typeof bant
  | typeof pullHitter
  | typeof pressureRun
  | typeof doublePlay
  | typeof headSliding
  | typeof homeBaseGuardian
  | typeof homeBaseAssaulter
  | typeof laserBeam
  | typeof lowBallHitter
  | typeof fullBase
  | typeof whisper
  | typeof bazooka
  | typeof fearfullBatter;
export const fielderTogglableAbilityNames: FielderTogglableAbilityNames[] = [
  powerHitter,
  averageHitter,
  outCourseHitter,
  fall,
  badBallHitter,
  inCourseHitter,
  unexpected,
  oxidizedSilver,
  error,
  festival,
  disturbance,
  converge,
  adversity,
  wideRange,
  SAYONARA,
  strikeOuter,
  fieldingExpert,
  encounter,
  vsAce,
  pinchHitter,
  vsBreakingBall,
  doubleSure,
  chanceMaker,
  infieldHitter,
  lightStroke,
  summer,
  insistent,
  highBallHitter,
  spring,
  bant,
  pullHitter,
  pressureRun,
  doublePlay,
  headSliding,
  homeBaseGuardian,
  homeBaseAssaulter,
  laserBeam,
  lowBallHitter,
  fullBase,
  whisper,
  bazooka,
  fearfullBatter,
];
export function isFielderTogglableAbilityNames(
  s: string
): s is FielderTogglableAbilityNames {
  return fielderTogglableAbilityNames.includes(
    s as FielderTogglableAbilityNames
  );
}

export type FielderAbilityNames =
  | BasicFielderAbilityNames
  | BasicFielderSpecialAbilityNames
  | FielderTogglableAbilityNames;
export function isFielderAbilityNames(s: string): s is FielderAbilityNames {
  return (
    isBasicFielderAbilityNames(s) ||
    isBasicFielderSpecialAbilityNames(s) ||
    isFielderTogglableAbilityNames(s)
  );
}

export const fielderAbilityDefinitions: Record<FielderAbilityNames, Ability> = {
  elevation: {
    name: "弾道",
    maximum: 4,
    minimum: 1,
    kind: integer,
  },
  meet: {
    name: "ミート",
    abbreviation: "ミー",
    maximum: 100,
    minimum: 1,
    kind: integer,
  },
  power: {
    name: "パワー",
    abbreviation: "パワ",
    maximum: 100,
    minimum: 1,
    kind: integer,
  },
  sprint: {
    name: "走力",
    maximum: 100,
    minimum: 1,
    kind: integer,
  },
  fielding: {
    name: "守備力",
    abbreviation: "守備",
    maximum: 100,
    minimum: 1,
    kind: integer,
  },
  arm: {
    name: "肩力",
    maximum: 100,
    minimum: 1,
    kind: integer,
  },
  catching: {
    name: "捕球",
    maximum: 100,
    minimum: 1,
    kind: integer,
  },
  chance: {
    name: "チャンス",
    abbreviation: "チャ",
    maximum: 6,
    minimum: 0,
    supreme: {
      name: "勝負師",
      abbreviation: "勝負",
    },
    kind: chance,
  },
  vsLeftyPitcher: {
    name: "対左投手",
    abbreviation: "対左",
    maximum: 6,
    minimum: 0,
    supreme: {
      name: "左腕キラー",
      abbreviation: "左キ",
    },
    kind: vsLeftyPitcher,
  },
  catcherLead: {
    name: "キャッチャーリード",
    abbreviation: "キャ",
    maximum: 6,
    minimum: 0,
    supreme: {
      name: "球界の頭脳",
      abbreviation: "頭脳",
    },
    kind: catcherLead,
  },
  stealing: {
    name: "盗塁",
    maximum: 6,
    minimum: 0,
    supreme: {
      name: "電光石火",
      abbreviation: "電光",
    },
    kind: stealing,
  },
  baseRunning: {
    name: "走塁",
    maximum: 6,
    minimum: 0,
    supreme: {
      name: "高速ベースラン",
      abbreviation: "ﾍﾞｰﾗﾝ",
    },
    kind: baseRunning,
  },
  throwing: {
    name: "送球",
    maximum: 6,
    minimum: 0,
    supreme: {
      name: "ストライク送球",
      abbreviation: "ｽﾄﾗｲｸ",
    },
    kind: throwing,
  },
  powerHitter: {
    good: {
      name: "パワーヒッター",
      abbreviation: "ﾊﾟﾜﾋ",
    },
    supreme: {
      name: "アーチスト",
      abbreviation: "ｱｰﾁ",
    },
    kind: toggle,
  },
  averageHitter: {
    good: {
      name: "アベレージヒッター",
      abbreviation: "ｱﾍﾞﾋ",
    },
    supreme: {
      name: "安打製造機",
      abbreviation: "安製",
    },
    kind: toggle,
  },
  outCourseHitter: {
    good: {
      name: "アウトコースヒッター",
      abbreviation: "外打",
    },
    supreme: {
      name: "外角必打",
      abbreviation: "外必打",
    },
    kind: toggle,
  },
  fall: {
    good: {
      name: "秋男",
    },
    kind: toggle,
  },
  badBallHitter: {
    name: "悪球打ち",
    abbreviation: "悪球",
    kind: feature,
  },
  inCourseHitter: {
    good: {
      name: "インコースヒッター",
      abbreviation: "内打",
    },
    supreme: {
      name: "内角必打",
      abbreviation: "内角必",
    },
    kind: toggle,
  },
  unexpected: {
    good: {
      name: "意外性",
    },
    supreme: {
      name: "大番狂わせ",
      abbreviation: "番狂",
    },
    kind: toggle,
  },
  oxidizedSilver: {
    good: {
      name: "いぶし銀",
      abbreviation: "いぶし",
    },
    kind: toggle,
  },
  error: {
    bad: {
      name: "エラー",
    },
    kind: toggle,
  },
  festival: {
    good: {
      name: "お祭り男",
      abbreviation: "祭男",
    },
    kind: toggle,
  },
  disturbance: {
    good: {
      name: "かく乱",
    },
    supreme: {
      name: "トリックスター",
    },
    kind: toggle,
  },
  converge: {
    good: {
      name: "固め打ち",
      abbreviation: "固打",
    },
    supreme: {
      name: "メッタ打ち",
      abbreviation: "メッタ",
    },
    kind: toggle,
  },
  adversity: {
    good: {
      name: "逆境○",
    },
    supreme: {
      name: "火事場の馬鹿力",
      abbreviation: "火馬鹿",
    },
    kind: toggle,
  },
  wideRange: {
    good: {
      name: "広角打法",
      abbreviation: "広角",
    },
    supreme: {
      name: "広角砲",
    },
    kind: toggle,
  },
  SAYONARA: {
    good: {
      name: "サヨナラ男",
      abbreviation: "ｻﾖﾅﾗ",
    },
    supreme: {
      name: "伝説のサヨナラ男",
      abbreviation: "伝説サ",
    },
    kind: toggle,
  },
  strikeOuter: {
    bad: {
      name: "三振",
    },
    inferior: {
      name: "扇風機",
    },
    kind: toggle,
  },
  fieldingExpert: {
    good: {
      name: "守備職人",
      abbreviation: "守備職",
    },
    supreme: {
      name: "魔術師",
    },
    kind: toggle,
  },
  encounter: {
    good: {
      name: "初球○",
    },
    supreme: {
      name: "一球入魂",
      abbreviation: "入魂",
    },
    kind: toggle,
  },
  vsAce: {
    good: {
      name: "対エース○",
      abbreviation: "対エ○",
    },
    supreme: {
      name: "エースキラー",
      abbreviation: "Aキラ",
    },
    kind: toggle,
  },
  pinchHitter: {
    good: {
      name: "代打○",
    },
    supreme: {
      name: "代打の神様",
      abbreviation: "代打神",
    },
    kind: toggle,
  },
  vsBreakingBall: {
    good: {
      name: "対変化球○",
      abbreviation: "対変○",
    },
    kind: toggle,
  },
  doubleSure: {
    good: {
      name: "ダメ押し",
      abbreviation: "ダ押",
    },
    kind: toggle,
  },
  chanceMaker: {
    good: {
      name: "チャンスメーカー",
      abbreviation: "ﾁｬﾝﾒ",
    },
    supreme: {
      name: "切り込み隊長",
      abbreviation: "切込隊",
    },
    kind: toggle,
  },
  infieldHitter: {
    good: {
      name: "内野安打○",
      abbreviation: "内野安",
    },
    supreme: {
      name: "ロケットスタート",
      abbreviation: "ﾛｹｯﾄ",
    },
    kind: toggle,
  },
  lightStroke: {
    good: {
      name: "流し打ち",
      abbreviation: "流打",
    },
    supreme: {
      name: "芸術的流し打ち",
      abbreviation: "芸術流",
    },
    kind: toggle,
  },
  summer: {
    good: {
      name: "夏男",
    },
    kind: toggle,
  },
  insistent: {
    good: {
      name: "粘り打ち",
      abbreviation: "粘り",
    },
    kind: toggle,
  },
  highBallHitter: {
    good: {
      name: "ハイボールヒッター",
      abbreviation: "高打",
    },
    supreme: {
      name: "高球必打",
      abbreviation: "高必打",
    },
    kind: toggle,
  },
  spring: {
    good: {
      name: "春男",
    },
    kind: toggle,
  },
  bant: {
    good: {
      name: "バント○",
      abbreviation: "ﾊﾞﾝﾄ",
    },
    kind: toggle,
  },
  pullHitter: {
    good: {
      name: "プルヒッター",
      abbreviation: "プル",
    },
    supreme: {
      name: "引っ張り屋",
      abbreviation: "引張屋",
    },
    kind: toggle,
  },
  pressureRun: {
    good: {
      name: "プレッシャーラン",
      abbreviation: "圧力走",
    },
    kind: toggle,
  },
  doublePlay: {
    bad: {
      name: "併殺",
    },
    kind: toggle,
  },
  headSliding: {
    good: {
      name: "ヘッドスライディング",
      abbreviation: "ﾍｯｽﾗ",
    },
    supreme: {
      name: "気迫ヘッド",
      abbreviation: "気迫",
    },
    kind: toggle,
  },
  homeBaseGuardian: {
    good: {
      name: "ホーム死守",
      abbreviation: "ﾎｰﾑ守",
    },
    supreme: {
      name: "鉄の壁",
    },
    kind: toggle,
  },
  homeBaseAssaulter: {
    good: {
      name: "ホーム突入",
      abbreviation: "突入",
    },
    supreme: {
      name: "重戦車",
    },
    kind: toggle,
  },
  laserBeam: {
    good: {
      name: "レーザービーム",
      abbreviation: "ﾚｰｻﾞｰ",
    },
    supreme: {
      name: "高速レーザー",
      abbreviation: "高レ",
    },
    kind: toggle,
  },
  lowBallHitter: {
    good: {
      name: "ローボールヒッター",
      abbreviation: "低打",
    },
    supreme: {
      name: "低球必打",
      abbreviation: "低必打",
    },
    kind: toggle,
  },
  fullBase: {
    good: {
      name: "満塁男",
    },
    supreme: {
      name: "恐怖の満塁男",
      abbreviation: "恐怖満",
    },
    kind: toggle,
  },
  whisper: {
    supreme: {
      name: "ささやき戦術",
      abbreviation: "囁き",
    },
    kind: goldOnly,
  },
  bazooka: {
    supreme: {
      name: "バズーカ送球",
      abbreviation: "ﾊﾞｽﾞｰｶ",
    },
    kind: goldOnly,
  },
  fearfullBatter: {
    good: {
      name: "野手威圧感",
      abbreviation: "野威",
    },
    kind: toggle,
  },
};
