import { Team, TeamObject } from "./team";
export type TeamHistoryObject = Record<number, TeamObject>;

export class TeamHistory {
  years: Record<number, Team> = {};
  initialYear: number;
  static new(team: Team): TeamHistory {
    return new TeamHistory(team);
  }
  static deserialize(o: TeamHistoryObject): TeamHistory | undefined {
    let ret: TeamHistory | undefined = undefined;
    Object.values(o).forEach((t: TeamObject) => {
      const team = Team.deserialize(t);
      if (ret === undefined) {
        ret = new TeamHistory(team);
        return;
      }
      ret.setYearOf(t.year, team);
    });
    return ret;
  }
  public constructor(team: Team) {
    const year = team.year;
    this.years[year] = team;
    this.initialYear = year;
  }
  get id(): string {
    return this.latest.id;
  }
  get name(): string {
    return this.latest.name;
  }
  public hasYear(y: number): boolean {
    return !!this.years[y];
  }
  get allYears(): number[] {
    return Object.keys(this.years)
      .map((s) => Number(s))
      .sort();
  }
  get lastYear(): number {
    const y = this.allYears.sort().pop();
    if (y === undefined) {
      return this.initialYear;
    }
    return Number(y);
  }
  get latest(): Team {
    return this.years[this.lastYear];
  }
  public yearOf(year: number): Team | undefined {
    return this.years[year];
  }
  public nextYear(): Team {
    const nextTeam = this.latest.nextYear();
    this.years[nextTeam.year] = nextTeam;
    return nextTeam;
  }
  public setYearOf(year: number, team: Team): void {
    if (!this.latest.same(team)) {
      return;
    }
    this.years[year] = team;
  }
  public toObject(): TeamHistoryObject {
    const ret: Record<number, TeamObject> = {};
    Object.entries(this.years).forEach(([y, t]) => {
      ret[Number(y)] = t.toObject();
    });
    return ret;
  }
}
