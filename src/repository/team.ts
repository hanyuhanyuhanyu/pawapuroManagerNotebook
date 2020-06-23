import { Either, Right } from "@/util/either";
import { TeamHistory, TeamHistoryObject } from "@/defs/teamHistory";
import { wellDefinedOnly } from "@/util/wellDefined";

export interface TeamRepositoryInterface {
  saveHistories(teams: TeamHistory[]): Either<string, void>;
  getAll(): TeamHistory[];
}
const teamKey = "teams";

export class TeamRepository implements TeamRepositoryInterface {
  saveHistories(teams: TeamHistory[]): Either<string, void> {
    localStorage.setItem(
      teamKey,
      JSON.stringify(teams.map((t) => t.toObject()))
    );
    return new Right(void 0);
  }
  clear(): void {
    localStorage.removeItem(teamKey);
  }
  getAll(): TeamHistory[] {
    const items = localStorage.getItem(teamKey);
    if (items === null) {
      return [];
    }
    const teams = JSON.parse(items) as TeamHistoryObject[];
    return wellDefinedOnly(teams.map((t) => TeamHistory.deserialize(t)));
  }
}
