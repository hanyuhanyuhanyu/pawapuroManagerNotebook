import { CommonDisplayer, isCommondDisplayer } from "../commonDisplayer";
import {
  closer,
  PitcherDetailedPositionNames,
  pitcherDetailedNames,
} from "./positionsAbility";
export const breakingBall = "breaking ball";
export const chance = "chance";
export const vsLeftyPitcher = "vsLeftyPitcher";
export const catcherLead = "catcherLead";
export const stealing = "stealing";
export const baseRunning = "baseRunning";
export const throwing = "throwing";

export const vsPinch = "vsPinch";
export const vsLeftyBatter = "vsLeftyBatter";
export const tough = "tough";
export const accelerated = "accelerated"; // ノビ
export const quick = "quick";
export const recovery = "recovery";

export const good = "good";
export const bad = "bad";
export const supreme = "supreme";
export const inferior = "inferior";
export type SettableStringvalue =
  | typeof good
  | typeof bad
  | typeof supreme
  | typeof inferior;
export type SettableValue = number | SettableStringvalue;
export const fastBall = "fast ball";

export const straight = "straight";
export const twoSeam = "twoSeam";
export const movingFast = "movingFast";
export const verySlowBall = "verySlowBall";
export const kokoroBreak = "kokoroBreak"; // ココロブレイク
export const mirageStraight = "mirageStraight"; // 幻影ストレート
export const bakusokuStraight = "bakusokuStraight"; // 爆速ストレート
export const kaisokuStraight = "kaisokuStraight"; // 快速ストレート
export const thunderBolt = "thunderBolt"; // サンダーボルト
export const risingShot = "risingShot"; // ライジングショット

export type FastBallAbilityNames =
  // straight
  | typeof straight
  | typeof twoSeam
  | typeof movingFast
  | typeof verySlowBall
  | typeof kokoroBreak // ココロブレイク
  | typeof mirageStraight // 幻影ストレート
  | typeof bakusokuStraight // 爆速ストレート
  | typeof kaisokuStraight // 快速ストレート
  | typeof thunderBolt // サンダーボルト
  | typeof risingShot; // ライジングショット

export const fastBallNames: FastBallAbilityNames[] = [
  straight,
  twoSeam,
  movingFast,
  verySlowBall,
  kokoroBreak,
  mirageStraight,
  bakusokuStraight,
  kaisokuStraight,
  thunderBolt,
  risingShot,
];

export function isFastBallAbilityNames(a: string): a is FastBallAbilityNames {
  return fastBallNames.includes(a as FastBallAbilityNames);
}

export const integer = "integer";
export const alphabet = "alphabet";
export const toggle = "toggle"; // 単なる赤とか青。三振 <=> 粘り打ちとか
export const feature = "feature"; //赤青。力配分とか
export const personality = "personality"; // 緑。積極打法とか
export const goldOnly = "goldOnly";

export const health = "health";
export const mood = "mood";
export const superAndInfer = "superAndInfer";
type AbilityKinds =
  | typeof integer
  | typeof alphabet
  | typeof toggle
  | typeof feature
  | typeof personality
  | typeof fastBall
  | typeof breakingBall
  | typeof health
  | typeof chance
  | typeof vsLeftyPitcher
  | typeof catcherLead
  | typeof stealing
  | typeof baseRunning
  | typeof throwing
  | typeof vsLeftyBatter
  | typeof superAndInfer
  | typeof accelerated
  | typeof quick
  | typeof recovery
  | typeof goldOnly;

export interface AbilityInterface {
  kind: AbilityKinds;
  maximum: number;
  minimum: number;
}
export function isAbilityInterface(a: any): a is AbilityInterface {
  if (typeof a !== "object" || a === null) {
    return false;
  }
  const { maximum, minimum } = a;
  return typeof maximum === "number" && typeof minimum === "number";
}

export interface SupremeAbility {
  supreme: CommonDisplayer;
}

export function isSupremeAbility(a: any): a is SupremeAbility {
  if (typeof a !== "object" || a === null) {
    return false;
  }
  const check = a.supreme;
  return isCommondDisplayer(check);
}

export interface InferiorAbility {
  inferior: CommonDisplayer;
}

export function isInferiorAbility(a: any): a is SupremeAbility {
  if (typeof a !== "object" || a === null) {
    return false;
  }
  const check = a.inferior;
  return isCommondDisplayer(check);
}

export type NumericAbility = CommonDisplayer &
  AbilityInterface & {
    kind: typeof integer;
  };

export type AlphabeticAbility = CommonDisplayer &
  AbilityInterface & {
    kind: typeof alphabet;
    maximum: 6;
    minimum: 0;
  };
export type ToggleAbility = ({
  kind: typeof toggle;
} & ({ good: CommonDisplayer } | { bad: CommonDisplayer })) &
  (SupremeAbility | InferiorAbility | {});
export type GoldOnlyAbility = {
  kind: typeof goldOnly;
} & SupremeAbility;

export type FeatureAbility = CommonDisplayer & {
  kind: typeof feature;
};

export type PersonalityAbility = CommonDisplayer & {
  kind: typeof personality;
};

export type HealthAbility = CommonDisplayer &
  AbilityInterface &
  SupremeAbility & { kind: typeof health };

export type ChanceAbility = CommonDisplayer &
  AbilityInterface &
  SupremeAbility & { kind: typeof chance };
export type VsLeftyPitcherAbility = CommonDisplayer &
  AbilityInterface &
  SupremeAbility & { kind: typeof vsLeftyPitcher };
export type CatcherLeadAbility = CommonDisplayer &
  AbilityInterface &
  SupremeAbility & { kind: typeof catcherLead };
export type StealingAbility = CommonDisplayer &
  AbilityInterface &
  SupremeAbility & { kind: typeof stealing };
export type BaseRunningAbility = CommonDisplayer &
  AbilityInterface &
  SupremeAbility & { kind: typeof baseRunning };
export type ThrowingAbility = CommonDisplayer &
  AbilityInterface &
  SupremeAbility & { kind: typeof throwing };

export type VsLeftyBatterAbility = CommonDisplayer &
  AbilityInterface &
  SupremeAbility & { kind: typeof vsLeftyBatter };
export type SuperAndInfer = CommonDisplayer &
  AbilityInterface &
  SupremeAbility &
  InferiorAbility & { kind: typeof superAndInfer };
export type AcceleratedAbility = CommonDisplayer &
  AbilityInterface &
  SupremeAbility & { kind: typeof accelerated };
export type QuickAbility = CommonDisplayer &
  AbilityInterface &
  SupremeAbility & { kind: typeof quick };
export type RecoverAbility = CommonDisplayer &
  AbilityInterface &
  SupremeAbility & { kind: typeof recovery };
export type FastBallAbility = CommonDisplayer & {
  direction: "straight";
  kind: typeof fastBall;
};
export const right = "right";
export const rightDown = "rightDown";
export const down = "down";
export const leftDown = "leftDown";
export const left = "left";

export const ballSpeed = "ballSpeed";
export const stamina = "stamina";
export const controll = "controll";

export const basicPitcherAbilityNamesExceptBallSpeed: BasicPitcherAbilityNames[] = [
  stamina,
  controll,
];
export type BasicPitcherAbilityNames =
  | PitcherDetailedPositionNames
  | typeof ballSpeed
  | typeof stamina
  | typeof controll;
export const basicPitcherAbilityNames: BasicPitcherAbilityNames[] = [
  ...basicPitcherAbilityNamesExceptBallSpeed,
  ballSpeed,
];
export function isBasicPitcherAbilityNames(
  s: string
): s is BasicPitcherAbilityNames {
  return (
    basicPitcherAbilityNames.includes(s as BasicPitcherAbilityNames) ||
    pitcherDetailedNames.includes(s as PitcherDetailedPositionNames)
  );
}

export const ballDirections = [right, rightDown, down, leftDown, left];
export type BallDirection =
  | typeof right
  | typeof rightDown
  | typeof down
  | typeof leftDown
  | typeof left;

export function isBallDirections(a: string): a is BallDirection {
  return ballDirections.includes(a as BallDirection);
}

export type BreakingBallAbility = CommonDisplayer & {
  direction: BallDirection;
  maximum: 7;
  minimum: 1;
  kind: typeof breakingBall;
};
export type PositionAbility = NumericAbility & { number: Set<number> };

export type Ability =
  | NumericAbility
  | AlphabeticAbility
  | ToggleAbility
  | FeatureAbility
  | FastBallAbility
  | BreakingBallAbility
  | PositionAbility
  | HealthAbility
  | ChanceAbility
  | VsLeftyPitcherAbility
  | CatcherLeadAbility
  | StealingAbility
  | BaseRunningAbility
  | ThrowingAbility
  | SuperAndInfer
  | VsLeftyBatterAbility
  | AcceleratedAbility
  | QuickAbility
  | RecoverAbility
  | PersonalityAbility
  | GoldOnlyAbility;

export type AbilityWithValue = Ability & { value: SettableValue | undefined };

export function isGoodAbility(a: any): a is SupremeAbility {
  if (typeof a !== "object" || a === null) {
    return false;
  }
  const check = a.good;
  return isCommondDisplayer(check);
}
export function isBadAbility(a: any): a is SupremeAbility {
  if (typeof a !== "object" || a === null) {
    return false;
  }
  const check = a.bad;
  return isCommondDisplayer(check);
}

export const basicPitcherSpecialAbilityNames: BasicPitcherSpecialAbilityNames[] = [
  vsPinch,
  vsLeftyBatter,
  tough,
  accelerated,
  quick,
  recovery,
];
export type BasicPitcherSpecialAbilityNames =
  | typeof vsPinch
  | typeof vsLeftyBatter
  | typeof tough
  | typeof accelerated
  | typeof quick
  | typeof recovery;
export function isBasicPitcherSpecialAbilityNames(
  s: string
): s is BasicPitcherSpecialAbilityNames {
  return basicPitcherSpecialAbilityNames.includes(
    s as BasicPitcherSpecialAbilityNames
  );
}

export const gyro = "gyro";
export const strikeOut = "strikeOut";
export const acute = "acute"; // キレ。鋭角という意味
export const slowFast = "slowFast"; // 緩急
export const hipUp = "hipUp"; // 尻上がり
export const escape = "escape";
export const heavy = "heavy";
export const inning = "inning";
export const luck = "luck";
export const stableSpeed = "stableSpeed";
export const emergency = "emergency";
export const crossFire = "crossFire";
export const checkBall = "checkBall";
export const international = "international";
export const guts = "guts";
export const shooting = "shooting";
export const slowStarter = "slowStarter";
export const vsGoodHitter = "vsGoodHitter";
export const reflexes = "reflexes"; // 反射神経。打球反応○のこと
export const holdingBall = "holdingBall"; // 球持ち
export const impatient = "impatient";
export const sabotage = "sabotage"; // 力配分
export const fightingSprit = "fightingSprit";
export const inCourse = "inCourse";
export const lowCourse = "lowCourse";
export const pokerFace = "pokerFace";
export const four = "four"; // base on balls
export const hunting = "hunting"; // 狩猟と同じ綴りだが、これで電気用語で「乱調」という意味
export const release = "release"; // リリース○
export const fearfullPitcher = "fearfullPitcher";
export type PitcherTogglableAbilityNames =
  | typeof gyro
  | typeof strikeOut
  | typeof acute
  | typeof slowFast
  | typeof hipUp
  | typeof escape
  | typeof heavy
  | typeof inning
  | typeof luck
  | typeof stableSpeed
  | typeof emergency
  | typeof crossFire
  | typeof checkBall
  | typeof international
  | typeof guts
  | typeof shooting
  | typeof slowStarter
  | typeof vsGoodHitter
  | typeof reflexes
  | typeof holdingBall
  | typeof impatient
  | typeof sabotage
  | typeof fightingSprit
  | typeof inCourse
  | typeof lowCourse
  | typeof pokerFace
  | typeof four
  | typeof hunting
  | typeof release
  | typeof fearfullPitcher;
export const pitcherTogglableAbilityNames: PitcherTogglableAbilityNames[] = [
  gyro,
  strikeOut,
  acute,
  slowFast,
  hipUp,
  escape,
  heavy,
  inning,
  luck,
  stableSpeed,
  emergency,
  crossFire,
  checkBall,
  international,
  guts,
  shooting,
  slowStarter,
  vsGoodHitter,
  reflexes,
  holdingBall,
  impatient,
  sabotage,
  fightingSprit,
  inCourse,
  lowCourse,
  pokerFace,
  four,
  hunting,
  release,
  fearfullPitcher,
];
export function isPitcherTogglableAbilityNames(
  s: string
): s is PitcherTogglableAbilityNames {
  return pitcherTogglableAbilityNames.includes(
    s as PitcherTogglableAbilityNames
  );
}
export type PitcherAbilityNames =
  | BasicPitcherAbilityNames
  | BasicPitcherSpecialAbilityNames
  | PitcherTogglableAbilityNames;

export function isPitcherAbilityNames(s: string): s is PitcherAbilityNames {
  return (
    isBasicPitcherAbilityNames(s) ||
    isBasicPitcherSpecialAbilityNames(s) ||
    isPitcherTogglableAbilityNames(s)
  );
}
