export interface PlayerBasicInformations {
  throwDominant: "right" | "left";
  hittingDominant: "right" | "left" | "both";
}
export const defaultInformation: PlayerBasicInformations = {
  throwDominant: "right",
  hittingDominant: "right",
};
export class PlayerBasics {
  constructor(
    private information: PlayerBasicInformations = defaultInformation
  ) {}
  get throwDominant(): "right" | "left" {
    return this.information.throwDominant;
  }
  get hittingDominant(): "right" | "left" | "both" {
    return this.information.hittingDominant;
  }
  get rightThrow(): boolean {
    return this.throwDominant === "right";
  }
}
