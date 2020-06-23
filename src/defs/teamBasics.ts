import { Player } from "./player";

export interface TeamBasicInformation {
  id: string;
  name: string;
  players: Player[];
}
export const defaultTeamInformation: TeamBasicInformation = {
  id: "default team",
  name: "野球チーム名",
  players: [],
};
