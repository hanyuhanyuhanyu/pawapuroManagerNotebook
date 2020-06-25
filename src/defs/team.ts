import { Player, PlayerObject } from "./player";
import { Either, Right, Left } from "@/util/either";
import { TeamBasicInformation, defaultTeamInformation } from "./teamBasics";
import { newId } from "@/util/newUuid";
export interface TeamObject {
  id: string;
  name: string;
  year: number;
  players: PlayerObject[];
}

export const PLAYER_DUPLICATE = "already have same player";
export const PLAYER_NOT_FOUND = "given player not found";
export class Team {
  private sorted: Player[] = [];
  static new(
    name: string,
    year: number,
    id?: string,
    players: Player[] = []
  ): Team {
    id = id || newId();
    return new Team(
      {
        id,
        name,
        players,
      },
      year
    );
  }
  public same(team: Team): boolean {
    return this.id === team.id;
  }
  public static deserialize(t: TeamObject): Team {
    const players = t.players.map((p) => Player.deserialize(p));
    return new Team(
      {
        id: t.id,
        name: t.name,
        players,
      },
      t.year
    );
  }
  private constructor(
    private info: TeamBasicInformation,
    private _year: number
  ) {
    this._year = Number(_year);
  }
  get id(): string {
    return this.info.id;
  }
  get name(): string {
    return this.info.name;
  }
  set name(name: string) {
    this.info.name = name;
  }
  get year(): number {
    return this._year;
  }
  get players(): Player[] {
    return this.info.players;
  }
  get starters(): Player[] {
    return this.players.filter((p) => p.isStarter);
  }
  get relievers(): Player[] {
    return this.players.filter((p) => p.isReleiver);
  }
  get closers(): Player[] {
    return this.players.filter((p) => p.isCloser);
  }
  get catchers(): Player[] {
    return this.players.filter((p) => p.isCatcher);
  }
  get infielders(): Player[] {
    return this.players.filter((p) => p.isInfielder);
  }
  get firsts(): Player[] {
    return this.players.filter((p) => p.isFirst);
  }
  get seconds(): Player[] {
    return this.players.filter((p) => p.isSecond);
  }
  get thirds(): Player[] {
    return this.players.filter((p) => p.isThird);
  }
  get shorts(): Player[] {
    return this.players.filter((p) => p.isShort);
  }
  get outfielders(): Player[] {
    return this.players.filter((p) => p.isOutFielder);
  }
  protected playerIndex(player: Player): number {
    return this.players.findIndex((p) => player.isSamePlayer(p));
  }
  public addPlayer(player: Player): Either<string, void> {
    if (this.playerIndex(player) >= 0) {
      return new Left(PLAYER_DUPLICATE);
    }
    this.info.players.push(player);
    return new Right(void 0);
  }
  public removePlayer(player: Player) {
    const i = this.playerIndex(player);
    if (i < 0) {
      return;
    }
    this.info.players.splice(i, 1);
  }
  public updatePlayer(player: Player): Either<string, void> {
    const index = this.playerIndex(player);
    if (index < 0) {
      return new Left(PLAYER_NOT_FOUND);
    }
    this.info.players.splice(index, 1, player);
    return new Right(void 0);
  }
  public compare(another: Team): number {
    if (this.id !== another.id) {
      return this.id.localeCompare(another.id);
    }
    return this.year - another.year;
  }
  public toObject(): TeamObject {
    return {
      id: this.id,
      name: this.name,
      year: this.year,
      players: this.players.map((p) => p.toObject()),
    };
  }
  public nextYear(): Team {
    return Team.new(
      this.name,
      this.year + 1,
      this.id,
      this.players.map((p) => p.clone())
    );
  }
}
