import moment from "moment";
import { newId } from "@/util/newUuid";
export const firstName = "firstName";
export const lastName = "lastName";
export const firstAndLast = "firstAndLast";
export const nickName = "nickName";
export const registrationNames = [firstName, lastName, firstAndLast, nickName];
export type RegistrationNameType =
  | typeof firstName
  | typeof lastName
  | typeof firstAndLast
  | typeof nickName;

export const right = "right";
export const left = "left";
export const arms = [right, left];
export const armsMap: Record<Arms, string> = {
  [right]: "右",
  [left]: "左",
};
export type Arms = typeof right | typeof left;
export const both = "both";
export const armsWithBoth = [...arms, both];
export const armsWithBothMap: Record<ArmsAndBoth, string> = {
  [right]: "右",
  [left]: "左",
  [both]: "両",
};

export type ArmsAndBoth = Arms | typeof both;
export interface PlayerBasicInformations {
  id: string;
  throwArm: Arms;
  hittingArm: ArmsAndBoth;
  firstName: string;
  lastName: string;
  registeredName: string;
  birthday: moment.Moment;
  professionalFrom: number;
  registrationNameType: RegistrationNameType;
}
export const defaultInformation: PlayerBasicInformations = {
  id: "default player",
  throwArm: right,
  hittingArm: right,
  firstName: "名前",
  lastName: "苗字",
  registeredName: "",
  birthday: moment().set({
    year: 2000,
    month: 0,
    date: 1,
  }),
  professionalFrom: 2020,
  registrationNameType: lastName,
};
export interface PlayerBasicsObject {
  information: Omit<PlayerBasicInformations, "birthday"> & { birthday: string };
}

export class PlayerBasics {
  public static deserialize(p: PlayerBasicsObject): PlayerBasics {
    const deserialized = Object.assign({}, p.information, {
      birthday: moment(p.information.birthday),
    });
    return new PlayerBasics(deserialized);
  }
  constructor(
    private information: PlayerBasicInformations = defaultInformation
  ) {
    information.id = newId();
    this.information = information;
  }
  get id(): string {
    return this.information.id;
  }
  // 流石にset idは提供しない
  get throwArm(): Arms {
    return this.information.throwArm;
  }
  set throwArm(arm: Arms) {
    this.information.throwArm = arm;
  }
  get hittingArm(): ArmsAndBoth {
    return this.information.hittingArm;
  }
  set hittingArm(arm: ArmsAndBoth) {
    this.information.hittingArm = arm;
  }
  get rightThrow(): boolean {
    return this.throwArm === "right";
  }
  get name(): string {
    return this.registeredName;
  }
  get firstName(): string {
    return this.information.firstName;
  }
  set firstName(name: string) {
    this.information.firstName = name;
  }
  get lastName(): string {
    return this.information.lastName;
  }
  set lastName(name: string) {
    this.information.lastName = name;
  }
  get registeredName(): string {
    return this.information.registeredName;
  }
  set registeredName(name: string) {
    this.information.registeredName = name;
  }
  get registrationNameType(): RegistrationNameType {
    return this.information.registrationNameType;
  }
  set registrationNameType(type: RegistrationNameType) {
    this.information.registrationNameType = type;
  }
  get birthYear(): number {
    return this.information.birthday.year();
  }
  set birthYear(val: number) {
    this.information.birthday = moment(this.information.birthday).set(
      "year",
      val
    );
  }
  get birthMonth(): number {
    return this.information.birthday.month() + 1;
  }
  set birthMonth(val: number) {
    this.information.birthday = moment(this.information.birthday).set(
      "month",
      val
    );
  }
  get birthDate(): number {
    return this.information.birthday.date();
  }
  set birthDate(val: number) {
    this.information.birthday = moment(this.information.birthday).set(
      "date",
      val
    );
  }
  public age(date: moment.Moment | number): number {
    if (typeof date === "number") {
      return date - this.birthYear;
    }
    return date.diff(this.information.birthday, "year");
  }
  get professionalFrom(): number {
    return this.information.professionalFrom;
  }
  set professionalFrom(year: number) {
    this.information.professionalFrom = year;
  }
  public toObject(): PlayerBasicsObject {
    const serialized = Object.assign({}, this.information, {
      birthday: this.information.birthday.toString(),
    });
    return {
      information: this.information,
    };
  }
}
