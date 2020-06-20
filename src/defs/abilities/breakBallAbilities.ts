import { isCommondDisplayer } from "../commonDisplayer";
import {
  BreakingBallAbility,
  BallDirection,
  right,
  rightDown,
  down,
  leftDown,
  left,
  breakingBall,
  FastBallAbilityNames,
} from "./commonType";

// 右投げ基準/打者目線 => 右利きの能力画面で右方向に伸びていればright扱い
// 実際に曲がる方向ではないことに注意
// 左利きだと逆になる

export function isBreakingBallAbility(a: any): a is BreakingBallAbility {
  if (!isCommondDisplayer(a)) {
    return false;
  }
  return (a as any).kind === breakingBall;
}

export const slider = "slider";
export const hSlider = "hSlider";
export const cutBall = "cutBall";
export const extremeTrueMagicalBallRebuild = "extremeTrueMagicalBallRebuild"; // 超真魔球改
export const clider = "clider"; // クライダー
export const rightBreakingBallNames: RightBreakingBallAbilityNames[] = [
  slider,
  hSlider,
  cutBall,
  extremeTrueMagicalBallRebuild,
  clider,
];
export type RightBreakingBallAbilityNames =
  | typeof slider
  | typeof hSlider
  | typeof cutBall
  | typeof extremeTrueMagicalBallRebuild
  | typeof clider;
export function isRightBreakingBallAbilityNames(
  a: string
): a is RightBreakingBallAbilityNames {
  return rightBreakingBallNames.includes(a as RightBreakingBallAbilityNames);
}

export const curve = "curve";
export const slowCurve = "slowCurve";
export const drop = "drop";
export const sSlider = "sSlider";
export const dropCurve = "dropCurve";
export const slirve = "slirve"; // スラーブ。つづりわからん
export const knuckleCurve = "knuckleCurve";
export type RightDownBreakingBallAbilityNames =
  | typeof curve
  | typeof slowCurve
  | typeof drop
  | typeof sSlider
  | typeof dropCurve
  | typeof slirve
  | typeof knuckleCurve;
export const rightDownBreakingNames: RightDownBreakingBallAbilityNames[] = [
  curve,
  slowCurve,
  drop,
  sSlider,
  dropCurve,
  slirve,
  knuckleCurve,
];
export function isRightDownBreakingBallAbilityNames(
  s: string
): s is RightDownBreakingBallAbilityNames {
  return rightDownBreakingNames.includes(
    s as RightDownBreakingBallAbilityNames
  );
}

export const fork = "fork";
export const sff = "sff";
export const vSlider = "vSlider";
export const changeUp = "changeUp";
export const palm = "palm";
export const knuckle = "knuckle";
export const forkShoot = "forkShoot"; // フォッシュ
export const roseRouge = "roseRouge"; // ロゼルージュ
export const darkNebula = "darkNebula"; // 暗黒星雲
export const rakkaseiba = "rakkaseiba"; // ラッカセイバー
export const rambleFall = "rambleFall"; // ランブルフォール
export type DownBreakingBallAbilityNames =
  | typeof fork
  | typeof sff
  | typeof vSlider
  | typeof changeUp
  | typeof palm
  | typeof knuckle
  | typeof forkShoot
  | typeof roseRouge
  | typeof darkNebula
  | typeof rakkaseiba
  | typeof rambleFall;
export const downBreakingBallNames: DownBreakingBallAbilityNames[] = [
  fork,
  sff,
  vSlider,
  changeUp,
  palm,
  knuckle,
  forkShoot,
  roseRouge,
  darkNebula,
  rakkaseiba,
  rambleFall,
];
export function isDownBreakingBallAbilityNames(
  s: string
): s is DownBreakingBallAbilityNames {
  return downBreakingBallNames.includes(s as DownBreakingBallAbilityNames);
}

export const synker = "synker";
export const hSynker = "hSynker";
export const screw = "screw";
export const circleChange = "circleChange";
export const crescentMoon = "crescentMoon"; // クレッセントムーン
export const marineBall = "marineBall"; // マリンボール
export type LeftDownBreakingBallAbilityNames =
  | typeof synker
  | typeof hSynker
  | typeof screw
  | typeof circleChange
  | typeof crescentMoon
  | typeof marineBall;
export const leftDownBreakingBallNames: LeftDownBreakingBallAbilityNames[] = [
  synker,
  hSynker,
  screw,
  circleChange,
  crescentMoon,
  marineBall,
];
export function isLeftDownBreakingBallAbilityNames(
  s: string
): s is LeftDownBreakingBallAbilityNames {
  return leftDownBreakingBallNames.includes(
    s as LeftDownBreakingBallAbilityNames
  );
}

export const shoot = "shoot";
export const hShoot = "hShoot";
export const synkingFast = "synkingFast";
export const breadShoot = "breadShoot"; // ブレッドシュート
export type LeftBreakingBallAbilityNames =
  | typeof shoot
  | typeof hShoot
  | typeof synkingFast
  | typeof breadShoot;
export const leftBreakingBallNames: LeftBreakingBallAbilityNames[] = [
  shoot,
  hShoot,
  synkingFast,
  breadShoot,
];
export function isLeftBreakingBallAbilityNames(
  s: string
): s is LeftBreakingBallAbilityNames {
  return leftBreakingBallNames.includes(s as LeftBreakingBallAbilityNames);
}

export type BreakingBallNames =
  | RightBreakingBallAbilityNames
  | RightDownBreakingBallAbilityNames
  | DownBreakingBallAbilityNames
  | LeftDownBreakingBallAbilityNames
  | LeftBreakingBallAbilityNames;

export function isBreakingBallNames(s: string): s is BreakingBallNames {
  return (
    isRightBreakingBallAbilityNames(s) ||
    isRightDownBreakingBallAbilityNames(s) ||
    isDownBreakingBallAbilityNames(s) ||
    isLeftDownBreakingBallAbilityNames(s) ||
    isLeftBreakingBallAbilityNames(s)
  );
}
export type BallNames = BreakingBallNames | FastBallAbilityNames;

export function isDirectionMatch(
  s: BreakingBallNames,
  direction: BallDirection
): boolean {
  switch (direction) {
    case right:
      return isRightBreakingBallAbilityNames(s);
    case rightDown:
      return isRightDownBreakingBallAbilityNames(s);
    case down:
      return isDownBreakingBallAbilityNames(s);
    case leftDown:
      return isLeftDownBreakingBallAbilityNames(s);
    case left:
      return isLeftBreakingBallAbilityNames(s);
  }
  return false;
}

export const rightBreakingBallAbilityDefinitions: Record<
  RightBreakingBallAbilityNames,
  BreakingBallAbility
> = {
  slider: {
    name: "スライダー",
    direction: "right",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  hSlider: {
    name: "Hスライダー",
    direction: "right",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  cutBall: {
    name: "カットボール",
    direction: "right",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  extremeTrueMagicalBallRebuild: {
    name: "超真魔球改",
    direction: "right",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  clider: {
    name: "クライダー",
    direction: "right",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
};

export const rightDownBreakingBallAbilityDefinitions: Record<
  RightDownBreakingBallAbilityNames,
  BreakingBallAbility
> = {
  curve: {
    name: "カーブ",
    direction: "rightDown",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  slowCurve: {
    name: "スローカーブ",
    direction: "rightDown",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  drop: {
    name: "ドロップ",
    direction: "rightDown",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  sSlider: {
    name: "Sスライダー",
    direction: "rightDown",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  dropCurve: {
    name: "ドロップカーブ",
    direction: "rightDown",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  slirve: {
    name: "スラーブ",
    direction: "rightDown",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  knuckleCurve: {
    name: "ナックルカーブ",
    direction: "rightDown",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
};
export const downBreakingBallAbilityDefinitions: Record<
  DownBreakingBallAbilityNames,
  BreakingBallAbility
> = {
  fork: {
    name: "フォーク",
    direction: "down",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  sff: {
    name: "SFF",
    direction: "down",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  vSlider: {
    name: "Vスライダー",
    direction: "down",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  changeUp: {
    name: "チェンジアップ",
    direction: "down",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  palm: {
    name: "パーム",
    direction: "down",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  knuckle: {
    name: "ナックル",
    direction: "down",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  forkShoot: {
    name: "フォッシュ",
    direction: "down",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  roseRouge: {
    name: "ロゼルージュ",
    direction: "down",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  darkNebula: {
    name: "暗黒星雲",
    direction: "down",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  rakkaseiba: {
    name: "ラッカセイバー",
    direction: "down",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  rambleFall: {
    name: "ランブルフォール",
    direction: "down",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
};

export const leftDownBreakingBallAbilityDefinitions: Record<
  LeftDownBreakingBallAbilityNames,
  BreakingBallAbility
> = {
  synker: {
    name: "シンカー",
    direction: "leftDown",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  hSynker: {
    name: "Hシンカー",
    direction: "leftDown",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  screw: {
    name: "スクリュー",
    direction: "leftDown",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  circleChange: {
    name: "サークルチェンジ",
    direction: "leftDown",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  crescentMoon: {
    name: "クレッセントムーン",
    direction: "leftDown",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  marineBall: {
    name: "マリンボール",
    direction: "leftDown",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
};

export const leftBreakingBallAbilityDefinitions: Record<
  LeftBreakingBallAbilityNames,
  BreakingBallAbility
> = {
  shoot: {
    name: "シュート",
    direction: "left",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  hShoot: {
    name: "Hシュート",
    direction: "left",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  synkingFast: {
    name: "シンキングファスト",
    direction: "left",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
  breadShoot: {
    name: "ブレッドシュート",
    direction: "left",
    maximum: 7,
    minimum: 1,
    kind: breakingBall,
  },
};
