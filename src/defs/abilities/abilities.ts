import {
  rightBreakingBallAbilityDefinitions,
  rightDownBreakingBallAbilityDefinitions,
  downBreakingBallAbilityDefinitions,
  leftDownBreakingBallAbilityDefinitions,
  leftBreakingBallAbilityDefinitions,
  BreakingBallNames,
  isBreakingBallNames,
} from "./breakBallAbilities";
import { fastBallAbilityDefinitions } from "./fastBallAbilities";
import {
  FielderAbilityNames,
  fielderAbilityDefinitions,
  isFielderAbilityNames,
} from "./fielderAbilities";
import { pitcherAbilityDefinitions } from "./pitcherAbilities";
import {
  DetailedPositionAbilityNames,
  isPositionNames,
  positionAbilityDefinitions,
} from "./positionsAbility";
import {
  health,
  mood,
  toggle,
  isSupremeAbility,
  isInferiorAbility,
  supreme,
  inferior,
  good,
  bad,
  SettableValue,
  isAbilityInterface,
  SettableStringvalue,
  Ability,
  isBadAbility,
  isGoodAbility,
  PitcherAbilityNames,
  isPitcherAbilityNames,
  FastBallAbilityNames,
  isFastBallAbilityNames,
  alphabet,
  chance,
  vsLeftyPitcher,
  catcherLead,
  stealing,
  baseRunning,
  throwing,
  vsLeftyBatter,
  accelerated,
  quick,
  recovery,
  superAndInfer,
  personality,
  feature,
} from "./commonType";

export type CommonAbilityNames = typeof health | typeof mood;
export function isCommonAbilityNames(s: string): s is CommonAbilityNames {
  return [health, mood].includes(s);
}

export type AbilityNames =
  | FastBallAbilityNames
  | BreakingBallNames
  | CommonAbilityNames
  | FielderAbilityNames
  | PitcherAbilityNames
  | DetailedPositionAbilityNames;

export function isAbilityNames(s: string): s is AbilityNames {
  return (
    isFastBallAbilityNames(s) ||
    isBreakingBallNames(s) ||
    isCommonAbilityNames(s) ||
    isFielderAbilityNames(s) ||
    isPitcherAbilityNames(s) ||
    isPositionNames(s)
  );
}

export const commonAbilityDefinitions: Record<CommonAbilityNames, Ability> = {
  health: {
    name: "ケガしにくさ",
    abbreviation: "ケガ",
    maximum: 6,
    minimum: 0,
    supreme: {
      name: "鉄人",
    },
    kind: health,
  },
  mood: {
    good: {
      name: "ムード○",
      abbreviation: "ム○",
    },
    bad: {
      name: "ムード×",
      abbreviation: "ム×",
    },
    supreme: {
      name: "精神的支柱",
      abbreviation: "支柱",
    },
    kind: toggle,
  },
};

export const abilities: Record<AbilityNames, Ability> = Object.assign(
  {},
  fastBallAbilityDefinitions,
  rightBreakingBallAbilityDefinitions,
  rightDownBreakingBallAbilityDefinitions,
  downBreakingBallAbilityDefinitions,
  leftDownBreakingBallAbilityDefinitions,
  leftBreakingBallAbilityDefinitions,
  commonAbilityDefinitions,
  pitcherAbilityDefinitions,
  fielderAbilityDefinitions,
  positionAbilityDefinitions
);

export function settableStringValue(a: Ability): (SettableStringvalue | 1)[] {
  const settables: (SettableStringvalue | 1)[] = [];
  if (isSupremeAbility(a)) {
    settables.push(supreme);
  }
  if (isInferiorAbility(a)) {
    settables.push(inferior);
  }
  if (isGoodAbility(a)) {
    settables.push(good);
  }
  if (isBadAbility(a)) {
    settables.push(bad);
  }
  if (a.kind === feature || a.kind === personality) {
    settables.push(1);
  }
  return settables;
}
export function isSettableForAbility(
  a: Ability,
  value: SettableValue
): boolean {
  if (typeof value !== "number") {
    const settables = settableStringValue(a);
    return settables.includes(value);
  }
  if (!isAbilityInterface(a)) {
    return false;
  }
  const { maximum, minimum } = a;
  return minimum <= value && value <= maximum;
}

export function findAbilityDefinition(
  name: AbilityNames | string
): Ability | undefined {
  return (abilities as Record<string, Ability>)[name];
}

export const alphabeticAbilityKinds = [
  alphabet,
  health,
  chance,
  superAndInfer,
  vsLeftyPitcher,
  catcherLead,
  stealing,
  baseRunning,
  throwing,
  vsLeftyBatter,
  accelerated,
  quick,
  recovery,
];
export function isAlphabeticAbilityKinds(a: string): boolean {
  return alphabeticAbilityKinds.includes(a);
}
