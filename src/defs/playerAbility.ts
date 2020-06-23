import {
  DetailedPositionAbilityNames,
  isPositionNames,
  integratePosition,
  detailedPositionNames,
  reliever,
  pitcherDetailedNames,
  PitcherDetailedPositionNames,
  fielderPositionNames,
} from "./abilities/positionsAbility";
import {
  BreakingBallNames,
  RightBreakingBallAbilityNames,
  RightDownBreakingBallAbilityNames,
  DownBreakingBallAbilityNames,
  LeftDownBreakingBallAbilityNames,
  LeftBreakingBallAbilityNames,
  isBreakingBallNames,
  isBreakingBallAbility,
} from "./abilities/breakBallAbilities";
import {
  BasicFielderAbilityNames,
  BasicFielderSpecialAbilityNames,
  isBasicFielderAbilityNames,
  isBasicFielderSpecialAbilityNames,
  basicFielderAbilityNames,
  basicFielderSpecialAbilityNames,
  FielderTogglableAbilityNames,
  fielderTogglableAbilityNames,
  isFielderTogglableAbilityNames,
} from "./abilities/fielderAbilities";
import {
  isSettableForAbility,
  findAbilityDefinition,
  settableStringValue,
} from "./abilities/abilities";
import { Either, Left, Right } from "@/util/either";
import {
  BasicPitcherAbilityNames,
  SettableValue,
  BasicPitcherSpecialAbilityNames,
  FastBallAbilityNames,
  AbilityWithValue,
  basicPitcherSpecialAbilityNames,
  basicPitcherAbilityNames,
  isFastBallAbilityNames,
  isBasicPitcherAbilityNames,
  isBasicPitcherSpecialAbilityNames,
  Ability,
  PitcherTogglableAbilityNames,
  pitcherTogglableAbilityNames,
  isAbilityInterface,
  isPitcherTogglableAbilityNames,
} from "./abilities/commonType";

type BasicPitcherAbility = Record<BasicPitcherAbilityNames, SettableValue>;
type BasicPitcherSpecialAbility = Record<
  BasicPitcherSpecialAbilityNames,
  SettableValue
>;
type FastBallAbility = FastBallAbilityNames;
type OneOrTwo<T> = [T] | [T, T];
type ZeroToTwo<T> = [] | OneOrTwo<T>;
type PitcherBreakingBallAbility = {
  straight: Set<FastBallAbilityNames>;
  right: Partial<Record<RightBreakingBallAbilityNames, SettableValue>>;
  rightDown: Partial<Record<RightDownBreakingBallAbilityNames, SettableValue>>;
  down: Partial<Record<DownBreakingBallAbilityNames, SettableValue>>;
  leftDown: Partial<Record<LeftDownBreakingBallAbilityNames, SettableValue>>;
  left: Partial<Record<LeftBreakingBallAbilityNames, SettableValue>>;
};
export type PitcherBreakingBallAbilityWithValue = {
  straight: Record<FastBallAbilityNames, AbilityWithValue>;
  right: Record<RightBreakingBallAbilityNames, AbilityWithValue>;
  rightDown: Record<RightDownBreakingBallAbilityNames, AbilityWithValue>;
  down: Record<DownBreakingBallAbilityNames, AbilityWithValue>;
  leftDown: Record<LeftDownBreakingBallAbilityNames, AbilityWithValue>;
  left: Record<LeftBreakingBallAbilityNames, AbilityWithValue>;
};
export type PitcherTogglableAbility = Partial<
  Record<PitcherTogglableAbilityNames, SettableValue>
>;
export type PitcherAbilitySet = {
  basic: BasicPitcherAbility;
  special: BasicPitcherSpecialAbility;
  balls: PitcherBreakingBallAbility;
  toggles: PitcherTogglableAbility;
};
export type BasicPitcherAbilityWithValue = Record<
  BasicPitcherAbilityNames,
  AbilityWithValue
>;
export type BasicPitcherSpecialAbilityWithValue = Record<
  BasicPitcherSpecialAbilityNames,
  AbilityWithValue
>;
export type PitcherTogglableAbilityWithValue = Partial<
  Record<PitcherTogglableAbilityNames, AbilityWithValue>
>;
export type PitcherAbilityWithValue = {
  basic: BasicPitcherAbilityWithValue;
  special: BasicPitcherSpecialAbilityWithValue;
  balls: PitcherBreakingBallAbilityWithValue;
  toggles: PitcherTogglableAbilityWithValue;
};

export const defaultPitcher: PitcherAbilitySet = {
  basic: {
    ballSpeed: 80,
    stamina: 1,
    controll: 1,
    startingPitcher: 0,
    relievePitcher: 0,
    closingPitcher: 0,
  },
  special: {
    vsPinch: 3,
    vsLeftyBatter: 3,
    tough: 3,
    accelerated: 3,
    quick: 3,
    recovery: 3,
  },
  balls: {
    straight: new Set(["straight" as const]),
    right: {},
    rightDown: {},
    down: {},
    leftDown: {},
    left: {},
  },
  toggles: {},
};
type BasicFielderAbility = Record<BasicFielderAbilityNames, SettableValue>;
type BasicFielderSpecialAbility = Record<
  BasicFielderSpecialAbilityNames,
  SettableValue
>;
type BasicFielderPositionAbility = Record<
  DetailedPositionAbilityNames,
  SettableValue | undefined
>;
type FielderTogglableAbility = Partial<
  Record<FielderTogglableAbilityNames, SettableValue>
>;
export type FielderAbilitySet = {
  basic: BasicFielderAbility;
  special: BasicFielderSpecialAbility;
  position: BasicFielderPositionAbility;
  toggles: FielderTogglableAbility;
};
export type BasicFielderAbilityWithValue = Record<
  BasicFielderAbilityNames,
  AbilityWithValue
>;
export type BasicFielderSpecialAbilityWithValue = Record<
  BasicFielderSpecialAbilityNames,
  AbilityWithValue
>;
export type BasicFielderPositionAbilityWithValue = Record<
  DetailedPositionAbilityNames,
  AbilityWithValue
>;
export type FielderTogglableAbilityWithValue = Partial<
  Record<FielderTogglableAbilityNames, AbilityWithValue>
>;

export type FielderAbilityWithValue = {
  basic: BasicFielderAbilityWithValue;
  special: BasicFielderSpecialAbilityWithValue;
  position: BasicFielderPositionAbilityWithValue;
  toggles: FielderTogglableAbilityWithValue;
};
export const defaultFielder: FielderAbilitySet = {
  basic: {
    elevation: 1,
    meet: 1,
    power: 1,
    sprint: 1,
    fielding: 1,
    arm: 1,
    catching: 1,
  },
  special: {
    chance: 3,
    vsLeftyPitcher: 3,
    catcherLead: 3,
    stealing: 3,
    baseRunning: 3,
    throwing: 3,
  },
  position: {
    pitcher: undefined,
    startingPitcher: undefined,
    relievePitcher: undefined,
    closingPitcher: undefined,
    catcher: undefined,
    first: undefined,
    second: undefined,
    third: undefined,
    short: undefined,
    outfielder: undefined,
    rightFielder: undefined,
    leftFielder: undefined,
    centerFielder: undefined,
  },
  toggles: {},
};
export const OUTOF_DOMAIN = "given value out of settable range";
export const NOT_EXISTING_PROPERTY = "given property not exists";
export const NOT_IMPLEMENTED_PROPERTY = "given property is not implemented";
export const ABILITY_NOT_GET = "cannot proper ability";
export const HAVING_BALL = "already have given ball";
export type AbilitySettingErrorMessage =
  | typeof OUTOF_DOMAIN
  | typeof NOT_EXISTING_PROPERTY
  | typeof NOT_IMPLEMENTED_PROPERTY
  | typeof ABILITY_NOT_GET
  | typeof HAVING_BALL;

export interface PlayerAbilityObject {
  pitcherAbility: PitcherAbilitySet;
  fielderAbility: FielderAbilitySet;
}
export class PlayerAbility {
  protected pitcherAbility: PitcherAbilitySet;
  protected fielderAbility: FielderAbilitySet;
  public static deserialize(p: PlayerAbilityObject): PlayerAbility {
    return new PlayerAbility(p.pitcherAbility, p.fielderAbility);
  }
  constructor(
    p: PitcherAbilitySet = defaultPitcher,
    f: FielderAbilitySet = defaultFielder
  ) {
    this.pitcherAbility = p;
    this.fielderAbility = f;
  }
  public toObject(): PlayerAbilityObject {
    return {
      pitcherAbility: this.pitcherAbility,
      fielderAbility: this.fielderAbility,
    };
  }

  public getAbilities(): {
    pitcher: PitcherAbilityWithValue;
    fielder: FielderAbilityWithValue;
  } {
    return {
      pitcher: this.pitcherAbilitiesWithValue,
      fielder: this.fielderAbilitiesWithValue,
    };
  }
  get sortedAvailablePositions(): DetailedPositionAbilityNames[] {
    const pos: DetailedPositionAbilityNames[] = [];
    if ((this.fielderAbilitiesWithValue.position.pitcher?.value || 0) > 0) {
      pitcherDetailedNames.forEach((p) => {
        if ((this.pitcherAbilitiesWithValue.basic[p]?.value || 0) > 0) {
          pos.push(p);
        }
      });
    }
    fielderPositionNames
      .map((f) => {
        return {
          name: f,
          value: this.fielderAbilitiesWithValue.position[f].value,
        };
      })
      .sort((a, b) => (a.value as number) - (b.value as number))
      .reverse()
      .forEach((f) => {
        if ((f.value as number) > 0) {
          pos.push(f.name);
        }
      });
    return pos;
  }
  get fielderAbilitiesWithValue(): FielderAbilityWithValue {
    return {
      basic: this.fielderBasicAbilities,
      special: this.fielderBasicSpcialAbilities,
      position: this.positionAbilities,
      toggles: this.fielderToggles,
    };
  }
  get fielderBasicAbilities(): BasicFielderAbilityWithValue {
    const ret: Record<string, AbilityWithValue> = {};
    basicFielderAbilityNames.forEach((s: BasicFielderAbilityNames) => {
      const abl = findAbilityDefinition(s);
      if (abl === undefined) {
        return;
      }
      ret[s] = {
        ...abl,
        value: this.fielderAbility.basic[s],
      };
    });
    return ret;
  }
  get fielderBasicSpcialAbilities(): BasicFielderSpecialAbilityWithValue {
    const ret: Record<string, AbilityWithValue> = {};
    basicFielderSpecialAbilityNames.forEach(
      (s: BasicFielderSpecialAbilityNames) => {
        const abl = findAbilityDefinition(s);
        if (abl === undefined) {
          return;
        }
        ret[s] = {
          ...abl,
          value: this.fielderAbility.special[s],
        };
      }
    );
    return ret;
  }
  get positionAbilities(): BasicFielderPositionAbilityWithValue {
    const ret: Record<string, AbilityWithValue> = {};
    detailedPositionNames.forEach((s: DetailedPositionAbilityNames) => {
      const abl = findAbilityDefinition(s);
      if (abl === undefined) {
        return;
      }
      ret[s] = {
        ...abl,
        value: this.fielderAbility.position[s],
      };
    });
    return ret;
  }
  get fielderToggles(): FielderTogglableAbilityWithValue {
    const ret: Record<string, AbilityWithValue> = {};
    fielderTogglableAbilityNames.forEach((s) => {
      const abl = findAbilityDefinition(s);
      if (abl === undefined) {
        return;
      }
      ret[s] = {
        ...abl,
        value: this.fielderAbility.toggles[s],
      };
    });
    return ret;
  }
  get pitcherAbilitiesWithValue(): PitcherAbilityWithValue {
    return {
      basic: this.pitcherBasicAbilities,
      special: this.pitcherSpecialAbilities,
      balls: this.ballAbilities,
      toggles: this.pitcherToggles,
    };
  }
  get pitcherBasicAbilities(): BasicPitcherAbilityWithValue {
    const ret: Record<string, AbilityWithValue> = {};
    basicPitcherAbilityNames
      .concat(pitcherDetailedNames)
      .forEach((s: BasicPitcherAbilityNames) => {
        const abl = findAbilityDefinition(s);
        if (abl === undefined) {
          return;
        }
        ret[s] = {
          ...abl,
          value: this.pitcherAbility.basic[s],
        };
      });
    return ret;
  }
  get pitcherSpecialAbilities(): BasicPitcherSpecialAbilityWithValue {
    const ret: Record<string, AbilityWithValue> = {};
    basicPitcherSpecialAbilityNames.forEach(
      (s: BasicPitcherSpecialAbilityNames) => {
        const abl = findAbilityDefinition(s);
        if (abl === undefined) {
          return;
        }
        ret[s] = {
          ...abl,
          value: this.pitcherAbility.special[s],
        };
      }
    );
    return ret;
  }
  get ballAbilities(): PitcherBreakingBallAbilityWithValue {
    function addAbilityDef<T extends FastBallAbilityNames | BreakingBallNames>(
      vs: Partial<Record<T, SettableValue>>
    ): Record<T, AbilityWithValue> {
      const ret: Record<string, AbilityWithValue> = {};
      Object.keys(vs).forEach((v: string) => {
        const abl = findAbilityDefinition(v);
        if (abl === undefined) {
          return;
        }
        ret[v] = {
          ...abl,
          value: vs[v as T],
        };
      });
      return ret;
    }
    const balls = this.pitcherAbility.balls;
    const straightMap: Partial<Record<
      FastBallAbilityNames,
      SettableValue
    >> = {};
    Array.from(balls.straight).forEach((s) => {
      straightMap[s] = 1;
    });
    return {
      straight: addAbilityDef(straightMap),
      right: addAbilityDef(balls.right),
      rightDown: addAbilityDef(balls.rightDown),
      down: addAbilityDef(balls.down),
      leftDown: addAbilityDef(balls.leftDown),
      left: addAbilityDef(balls.left),
    };
  }
  get pitcherToggles(): PitcherTogglableAbilityWithValue {
    const ret: Record<string, AbilityWithValue> = {};
    pitcherTogglableAbilityNames.forEach((s) => {
      const abl = findAbilityDefinition(s);
      if (abl === undefined) {
        return;
      }
      ret[s] = {
        ...abl,
        value: this.pitcherAbility.toggles[s],
      };
    });
    return ret;
  }
  public setAbility(
    prop: string,
    value: SettableValue | undefined
  ): Either<AbilitySettingErrorMessage, SettableValue | undefined> {
    const ability = findAbilityDefinition(prop);
    if (ability === undefined) {
      return new Left(NOT_EXISTING_PROPERTY);
    }
    if (isPositionNames(prop)) {
      return this.setPositionAbility(ability, prop, value);
    }
    if (isFastBallAbilityNames(prop)) {
      return this.setFastBallAbility(prop, value);
    }
    if (isBreakingBallNames(prop)) {
      return this.setBreakingBallAbility(ability, prop, value);
    }
    if (isFielderTogglableAbilityNames(prop)) {
      this.fielderAbility.toggles = Object.assign(
        {},
        this.fielderAbility.toggles,
        { [prop]: value }
      );
      return new Right(value);
    }
    if (isPitcherTogglableAbilityNames(prop)) {
      this.pitcherAbility.toggles = Object.assign(
        {},
        this.pitcherAbility.toggles,
        { [prop]: value }
      );
      return new Right(value);
    }

    if (value === undefined) {
      return new Left(OUTOF_DOMAIN);
    }
    const settables = settableStringValue(ability);
    if (
      typeof value !== "number" &&
      value !== undefined &&
      !settables.includes(value)
    ) {
      return new Left(OUTOF_DOMAIN);
    } else if (typeof value === "number" && isAbilityInterface(ability)) {
      const { maximum, minimum } = ability;
      if (value < minimum || maximum < value) {
        return new Left(OUTOF_DOMAIN);
      }
    }
    if (isBasicPitcherAbilityNames(prop)) {
      this.pitcherAbility.basic[prop] = value;
    } else if (isBasicPitcherSpecialAbilityNames(prop)) {
      this.pitcherAbility.special[prop] = value;
    } else if (isBasicFielderAbilityNames(prop)) {
      this.fielderAbility.basic[prop] = value as number; // settablesの判定は済んでいる
    } else if (isBasicFielderSpecialAbilityNames(prop)) {
      this.fielderAbility.special[prop] = value as number; // 道場
    } else {
      return new Left(NOT_IMPLEMENTED_PROPERTY);
    }
    return new Right(value);
  }
  protected setPositionAbility(
    ability: Ability,
    prop: DetailedPositionAbilityNames,
    value: SettableValue | undefined
  ): Either<AbilitySettingErrorMessage, SettableValue | undefined> {
    if (value !== undefined && !isSettableForAbility(ability, value)) {
      return new Left(OUTOF_DOMAIN);
    }
    this.fielderAbility.position = Object.assign(
      {},
      this.fielderAbility.position,
      { [prop]: value }
    );
    const integrated = integratePosition(prop);
    if (prop === integrated) {
      return new Right(value);
    }
    this.fielderAbility.position = Object.assign(
      {},
      this.fielderAbility.position,
      { [integrated]: value }
    );
    return new Right(value);
  }
  protected setFastBallAbility(
    prop: FastBallAbilityNames,
    value: SettableValue | undefined
  ): Either<AbilitySettingErrorMessage, SettableValue | undefined> {
    if (value === undefined) {
      this.pitcherAbility.balls.straight.delete(prop);
    } else if (this.pitcherAbility.balls.straight.has(prop)) {
      return new Left(HAVING_BALL);
    } else {
      this.pitcherAbility.balls.straight.add(prop);
    }
    this.pitcherAbility.balls.straight = new Set(
      this.pitcherAbility.balls.straight
    );
    return new Right(value);
  }
  protected setBreakingBallAbility(
    ability: Ability,
    prop: BreakingBallNames,
    value: SettableValue | undefined
  ): Either<AbilitySettingErrorMessage, SettableValue | undefined> {
    if (!isBreakingBallAbility(ability)) {
      return new Left(ABILITY_NOT_GET);
    }
    if (value !== undefined && !isSettableForAbility(ability, value)) {
      return new Left(OUTOF_DOMAIN);
    }
    const { direction } = ability;
    const target = this.pitcherAbility.balls[direction] as Partial<
      Record<BreakingBallNames, SettableValue>
    >;

    if (target[prop] !== undefined && value !== undefined) {
      return new Left(HAVING_BALL);
    }
    this.pitcherAbility.balls[direction] = Object.assign({}, target, {
      [prop]: value,
    });
    return new Right(value);
  }
}
