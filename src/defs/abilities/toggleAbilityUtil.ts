import {
  Ability,
  SettableValue,
  feature,
  personality,
  isAbilityInterface,
  supreme,
  good,
  bad,
  inferior,
  isSupremeAbility,
  isGoodAbility,
  isBadAbility,
  isInferiorAbility,
  BallDirection,
  straight,
  fastBallNames,
  right,
  rightDown,
  down,
  leftDown,
  left,
} from "./commonType";
import { isAlphabeticAbilityKinds, settableStringValue } from "./abilities";
import {
  isBreakingBallAbility,
  BreakingBallNames,
  rightBreakingBallNames,
  rightDownBreakingNames,
  downBreakingBallNames,
  leftDownBreakingBallNames,
  leftBreakingBallNames,
  BallNames,
} from "./breakBallAbilities";

export function getName(
  a: Ability,
  v: SettableValue | undefined
): string | undefined {
  if (v === "good") {
    return (a as any).good.name;
  }
  if (v === "bad") {
    return (a as any).bad.name;
  }
  if (v === "inferior") {
    return (a as any).inferior.name;
  }
  if (v === "supreme") {
    return (a as any).supreme.name;
  }
  return (a as any).name;
}
export function getAllName(a: Ability): string[] {
  return settableStringValue(a)
    .map((s) => getName(a, s))
    .filter((s) => s !== undefined) as string[];
}

export function getAbbreviation(
  a: Ability,
  v: SettableValue | undefined
): string | undefined {
  let abb: string | undefined = undefined;
  if (v === "good") {
    abb = (a as any).good.name;
  } else if (v === "bad") {
    abb = (a as any).bad.name;
  } else if (v === "inferior") {
    abb = (a as any).inferior.name;
  } else if (v === "supreme") {
    abb = (a as any).supreme.name;
  } else {
    abb = (a as any).name;
  }
  return abb || getName(a, v);
}

export function getValue(
  a: Ability,
  v: SettableValue,
  abbreviation = false
): number | string | undefined {
  if (typeof v !== "number" || a.kind === feature || a.kind === personality) {
    return abbreviation ? getAbbreviation(a, v) : getName(a, v);
  }
  if (isAlphabeticAbilityKinds(a.kind) && isAbilityInterface(a)) {
    //Aを基準として大文字を返す
    return String.fromCharCode(65 + a.maximum - v);
  }
  return v;
}

export function getAlphabeticalValue(v: number): string {
  if (v >= 90) {
    return "S";
  }
  if (v >= 80) {
    return "A";
  }
  if (v >= 70) {
    return "B";
  }
  if (v >= 60) {
    return "C";
  }
  if (v >= 50) {
    return "D";
  }
  if (v >= 40) {
    return "E";
  }
  if (v >= 20) {
    return "F";
  }
  return "G";
}

export function sortSettableValue(sets: SettableValue[]): void {
  sets.sort((a: SettableValue, b: SettableValue) => {
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }
    if (a === inferior) {
      return -1;
    }
    if (b === inferior) {
      return 1;
    }
    if (a === bad) {
      return -1;
    }
    if (b === bad) {
      return 1;
    }
    if (typeof a === "number") {
      return -1;
    }
    if (typeof b === "number") {
      return 1;
    }
    if (a === good) {
      return 1;
    }
    if (b === good) {
      return -1;
    }
    if (a === supreme) {
      return 1;
    }
    if (b === supreme) {
      return -1;
    }
    // 漏れてないはず
    return 0;
  });
}
export function getSettableValue(a: Ability): SettableValue[] {
  const values: SettableValue[] = [];
  if (isSupremeAbility(a)) {
    values.push(supreme);
  }
  if (isGoodAbility(a)) {
    values.push(good);
  }
  if (isBadAbility(a)) {
    values.push(bad);
  }
  if (isInferiorAbility(a)) {
    values.push(inferior);
  }
  if (isAbilityInterface(a)) {
    // 同値なら丁度その値だけ入るはずなので+1する
    Array.from({ length: a.maximum - a.minimum + 1 }).forEach((_, v) =>
      values.push(v + a.minimum)
    );
  }
  // 「力配分」など↑の分類に入らない、ただenableするだけのものは1のみが設定できる
  if (values.length === 0) {
    values.push(1);
  }
  sortSettableValue(values);
  return values;
}

export function settableBalls(a: BallDirection | typeof straight): BallNames[] {
  if (a === straight) {
    return fastBallNames;
  }
  switch (a) {
    case right:
      return rightBreakingBallNames;
    case rightDown:
      return rightDownBreakingNames;
    case down:
      return downBreakingBallNames;
    case leftDown:
      return leftDownBreakingBallNames;
    case left:
      return leftBreakingBallNames;
  }

  return [];
}
