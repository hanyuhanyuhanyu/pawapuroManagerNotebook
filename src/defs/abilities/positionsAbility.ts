import { integer, PositionAbility, PitcherAbilityNames } from "./commonType";

export const positionAbilityDefinitions: Record<
  DetailedPositionAbilityNames,
  PositionAbility
> = {
  pitcher: {
    name: "投手",
    abbreviation: "投",
    maximum: 100,
    minimum: 0,
    kind: integer,
    number: new Set([1]),
  },
  startingPitcher: {
    name: "先発投手",
    abbreviation: "先",
    maximum: 100,
    minimum: 0,
    kind: integer,
    number: new Set([1]),
  },
  relievePitcher: {
    name: "中継ぎ投手",
    abbreviation: "継",
    maximum: 100,
    minimum: 0,
    kind: integer,
    number: new Set([1]),
  },
  closingPitcher: {
    name: "抑え投手",
    abbreviation: "抑",
    maximum: 100,
    minimum: 0,
    kind: integer,
    number: new Set([1]),
  },
  catcher: {
    name: "捕手",
    abbreviation: "捕",
    maximum: 100,
    minimum: 0,
    kind: integer,
    number: new Set([2]),
  },
  first: {
    name: "一塁手",
    abbreviation: "一",
    maximum: 100,
    minimum: 0,
    kind: integer,
    number: new Set([3]),
  },
  second: {
    name: "二塁手",
    abbreviation: "二",
    maximum: 100,
    minimum: 0,
    kind: integer,
    number: new Set([4]),
  },
  third: {
    name: "三塁手",
    abbreviation: "三",
    maximum: 100,
    minimum: 0,
    kind: integer,
    number: new Set([5]),
  },
  short: {
    name: "遊撃手",
    abbreviation: "遊",
    maximum: 100,
    minimum: 0,
    kind: integer,
    number: new Set([6]),
  },
  outfielder: {
    name: "外野手",
    abbreviation: "外",
    maximum: 100,
    minimum: 0,
    kind: integer,
    number: new Set([7, 8, 9]),
  },
  rightFielder: {
    name: "右翼手",
    abbreviation: "右",
    maximum: 100,
    minimum: 0,
    kind: integer,
    number: new Set([9]),
  },
  centerFielder: {
    name: "中堅手",
    abbreviation: "中",
    maximum: 100,
    minimum: 0,
    kind: integer,
    number: new Set([8]),
  },
  leftFielder: {
    name: "左翼手",
    abbreviation: "左",
    maximum: 100,
    minimum: 0,
    kind: integer,
    number: new Set([7]),
  },
};

export const pitcher = "pitcher";
export const starter = "startingPitcher";
export const reliever = "relievePitcher";
export const closer = "closingPitcher";
export const catcher = "catcher";
export const first = "first";
export const second = "second";
export const third = "third";
export const short = "short";
export const outfielder = "outfielder";
export const rightFielder = "rightFielder";
export const centerFielder = "centerFielder";
export const leftFielder = "leftFielder";

export type PositionAbilityNames =
  | typeof pitcher
  | typeof catcher
  | typeof first
  | typeof second
  | typeof third
  | typeof short
  | typeof outfielder;
export type PitcherDetailedPositionNames =
  | typeof starter
  | typeof reliever
  | typeof closer;
export type OutFielderDetailedPositionNames =
  | typeof rightFielder
  | typeof centerFielder
  | typeof leftFielder;
export type DetailedPositionAbilityNames =
  | PositionAbilityNames
  | PitcherDetailedPositionNames
  | OutFielderDetailedPositionNames;
export const fielderPositionNames: PositionAbilityNames[] = [
  catcher,
  first,
  second,
  third,
  short,
  outfielder,
];
export const positionNames: PositionAbilityNames[] = [
  pitcher,
  ...fielderPositionNames,
];
export function isPositionNames(p: string): p is PositionAbilityNames {
  return positionNames.includes(p as PositionAbilityNames);
}
export const pitcherDetailedNames: PitcherDetailedPositionNames[] = [
  starter,
  reliever,
  closer,
];
export function isPitcherDetailedPositionNames(
  p: string
): p is PitcherDetailedPositionNames {
  return pitcherDetailedNames.includes(p as PitcherDetailedPositionNames);
}
export const outFielderDetailedPositionNames: OutFielderDetailedPositionNames[] = [
  rightFielder,
  centerFielder,
  leftFielder,
];
export function isOutFielderDetailedPositionNames(
  p: string
): p is OutFielderDetailedPositionNames {
  return outFielderDetailedPositionNames.includes(
    p as OutFielderDetailedPositionNames
  );
}
export const detailedPositionNames: DetailedPositionAbilityNames[] = [
  ...positionNames,
  ...pitcherDetailedNames,
  ...outFielderDetailedPositionNames,
];
export function isDetailedPositionNames(
  p: string
): p is DetailedPositionAbilityNames {
  return detailedPositionNames.includes(p as DetailedPositionAbilityNames);
}
export function integratePosition(
  p: DetailedPositionAbilityNames
): PositionAbilityNames {
  if (isPitcherDetailedPositionNames(p)) {
    return pitcher;
  }
  if (isOutFielderDetailedPositionNames(p)) {
    return outfielder;
  }
  return p;
}
