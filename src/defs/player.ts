import {
  PlayerAbility,
  FielderAbilityWithValue,
  PitcherAbilityWithValue,
  AbilitySettingErrorMessage,
} from "./playerAbility";
import { SettableValue, Ability } from "./abilities/commonType";
import { Either } from "@/util/either";
import { PlayerBasics } from "./playerBasics";

export class Player {
  constructor(
    private basic: PlayerBasics = new PlayerBasics(),
    private ability: PlayerAbility = new PlayerAbility()
  ) {}
  get fielderAbility(): FielderAbilityWithValue {
    return this.ability.getAbilities().fielder;
  }
  get pitcherAbility(): PitcherAbilityWithValue {
    return this.ability.getAbilities().pitcher;
  }
  get rightThrow(): boolean {
    return this.basic.rightThrow;
  }
  public setAbility(
    prop: string,
    value: SettableValue | undefined
  ): Either<AbilitySettingErrorMessage, SettableValue | undefined> {
    return this.ability.setAbility(prop, value);
  }
}
