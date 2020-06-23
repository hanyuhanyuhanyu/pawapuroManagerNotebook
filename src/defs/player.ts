import {
  PlayerAbility,
  FielderAbilityWithValue,
  PitcherAbilityWithValue,
  AbilitySettingErrorMessage,
  PlayerAbilityObject,
} from "./playerAbility";
import { SettableValue } from "./abilities/commonType";
import { Either } from "@/util/either";
import {
  PlayerBasics,
  Arms,
  ArmsAndBoth,
  firstName,
  lastName,
  firstAndLast,
  nickName,
  RegistrationNameType,
  PlayerBasicsObject,
} from "./playerBasics";
import moment from "moment";
import {
  PitcherDetailedPositionNames,
  pitcherDetailedNames,
  DetailedPositionAbilityNames,
} from "./abilities/positionsAbility";

export interface PlayerMiscs {
  memo: string;
}
const canCouchAge = 35;
const longCareerThreshold = 12;
const canCouchWithLongCareer = 32;
export interface PlayerObject {
  basic: PlayerBasicsObject;
  ability: PlayerAbilityObject;
  miscs: PlayerMiscs;
}
export class Player {
  public static deserialize(p: PlayerObject): Player {
    const basic = PlayerBasics.deserialize(p.basic);
    const ability = PlayerAbility.deserialize(p.ability);
    return new Player(basic, ability, p.miscs);
  }
  constructor(
    private basic: PlayerBasics = new PlayerBasics(),
    private ability: PlayerAbility = new PlayerAbility(),
    private miscs: PlayerMiscs = { memo: "" }
  ) {}
  get memo(): string {
    return this.miscs.memo;
  }
  set memo(memo: string) {
    this.miscs.memo = memo;
  }
  get id(): string {
    return this.basic.id;
  }
  get pitcherAptitude(): PitcherDetailedPositionNames[] {
    const aptitudes: PitcherDetailedPositionNames[] = [];
    pitcherDetailedNames.forEach((n) => {
      const val = this.ability.pitcherAbilitiesWithValue.basic[n];
      if (val !== undefined && val.value && val.value > 0) {
        aptitudes.push(n);
      }
    });
    return aptitudes;
  }
  set pitcherAptitude(pos: PitcherDetailedPositionNames[]) {
    const has = new Set(pos);
    pitcherDetailedNames.forEach((p) => {
      this.setAbility(p, Number(has.has(p)));
    });
  }
  get fielderAbility(): FielderAbilityWithValue {
    return this.ability.getAbilities().fielder;
  }
  get pitcherAbility(): PitcherAbilityWithValue {
    return this.ability.getAbilities().pitcher;
  }
  public setAbility(
    prop: string,
    value: SettableValue | undefined
  ): Either<AbilitySettingErrorMessage, SettableValue | undefined> {
    return this.ability.setAbility(prop, value);
  }
  // basics
  get throwArm(): Arms {
    return this.basic.throwArm;
  }
  set throwArm(arm: Arms) {
    this.basic.throwArm = arm;
  }
  get hittingArm(): ArmsAndBoth {
    return this.basic.hittingArm;
  }
  set hittingArm(arm: ArmsAndBoth) {
    this.basic.hittingArm = arm;
  }
  get rightThrow(): boolean {
    return this.throwArm === "right";
  }
  get firstName(): string {
    return this.basic.firstName;
  }
  set firstName(name: string) {
    this.basic.firstName = name;
  }
  get lastName(): string {
    return this.basic.lastName;
  }
  set lastName(name: string) {
    this.basic.lastName = name;
  }
  get registeredName(): string {
    switch (this.basic.registrationNameType) {
      case firstName:
        return this.firstName;
      case lastName:
        return this.lastName;
      case firstAndLast:
        return `${this.lastName}${this.firstName.substring(0, 1)}`;
      case nickName:
        return this.basic.registeredName;
    }
  }
  set registeredName(name: string) {
    this.basic.registeredName = name;
  }
  get nickName(): string {
    return this.basic.registeredName;
  }
  get registrationNameType(): RegistrationNameType {
    return this.basic.registrationNameType;
  }
  set registrationNameType(type: RegistrationNameType) {
    this.basic.registrationNameType = type;
  }
  get birthYear(): number {
    return this.basic.birthYear;
  }
  set birthYear(v: number) {
    this.basic.birthYear = v;
  }
  get birthMonth(): number {
    return this.basic.birthMonth;
  }
  set birthMonth(v: number) {
    this.basic.birthMonth = v - 1;
  }
  get birthDate(): number {
    return this.basic.birthDate;
  }
  set birthDate(v: number) {
    this.basic.birthDate = v;
  }
  get professionalFrom(): number {
    return this.basic.professionalFrom;
  }
  set professionalFrom(year: number) {
    this.basic.professionalFrom = year;
  }
  public careerYear(year: number): number {
    return year - this.professionalFrom + 1;
  }
  public age(date: moment.Moment | number): number {
    return this.basic.age(date);
  }
  public canTeach(year: moment.Moment | number): boolean {
    const age = this.age(year);
    if (typeof year !== "number") {
      year = year.year();
    }
    const career = this.careerYear(year);
    return (
      age >= canCouchAge ||
      (career >= longCareerThreshold && age >= canCouchWithLongCareer)
    );
  }
  get name(): string {
    return this.registeredName;
  }
  get sortedAvailablePositions(): DetailedPositionAbilityNames[] {
    return this.ability.sortedAvailablePositions;
  }
  public isSamePlayer(player: Player): boolean {
    return this.id === player.id;
  }
  public clone(): Player {
    return new Player(this.basic, this.ability, Object.assign({}, this.miscs));
  }
  public toObject(): PlayerObject {
    return {
      basic: this.basic.toObject(),
      ability: this.ability.toObject(),
      miscs: this.miscs,
    };
  }
}
